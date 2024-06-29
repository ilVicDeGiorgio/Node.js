const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();

const router = express.Router();

// Middleware di autorizzazione
const authorize = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ msg: "Unauthorized" });
    req.user = user;
    next();
  })(req, res, next);
};

// Registrazione utente
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );

    res.status(201).json({ msg: "Signup successful. Now you can log in." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login utente
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ msg: "User not found" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });

    await db.query("UPDATE users SET token = $1 WHERE id = $2", [
      token,
      user.id,
    ]);

    res.json({
      token: `Bearer ${token}`,
      id: user.id,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout utente
router.get("/logout", authorize, async (req, res) => {
  try {
    await db.query("UPDATE users SET token = NULL WHERE id = $1", [
      req.user.id,
    ]);
    res.json({ msg: "Logout successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
