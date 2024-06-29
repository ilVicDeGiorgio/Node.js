const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware Passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Rotte
app.use("/users", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
