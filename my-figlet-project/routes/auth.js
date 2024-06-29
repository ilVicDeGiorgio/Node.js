const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// Registrazione utente
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Controlla se l'utente esiste già
    const userExists = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserisci l'utente nel database
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
    // Verifica se l'utente esiste
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ msg: "User not found" });
    }

    const user = result.rows[0];

    // Verifica la password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Crea il payload per il token JWT
    const payload = {
      id: user.id,
      username: user.username,
    };

    // Firma il token
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });

    // Memorizza il token nel database
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

module.exports = router;
