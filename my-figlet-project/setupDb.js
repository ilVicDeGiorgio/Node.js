// setupDb.js
const db = require("./db");

const setupDb = async () => {
  try {
    await db.none("DROP TABLE IF EXISTS planets;");
    await db.none(`
            CREATE TABLE planets (
                id SERIAL NOT NULL PRIMARY KEY,
                name TEXT NOT NULL,
                image TEXT
            );
        `);
    await db.none("INSERT INTO planets (name) VALUES ($1), ($2);", [
      "Earth",
      "Mars",
    ]);
    console.log("Database setup complete.");
  } catch (err) {
    console.error("Errore durante la configurazione del database:", err);
  }
};

setupDb();
