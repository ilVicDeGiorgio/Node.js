const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../db");
const dotenv = require("dotenv");

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      db.query(
        "SELECT * FROM users WHERE id = $1",
        [jwt_payload.id],
        (err, result) => {
          if (err) {
            return done(err, false);
          }
          if (result.rows.length > 0) {
            return done(null, result.rows[0]);
          } else {
            return done(null, false);
          }
        }
      );
    })
  );
};
