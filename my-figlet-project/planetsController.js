// planetsController.js
const db = require("./db");
const path = require("path");

const getAllPlanets = async (req, res) => {
  try {
    const planets = await db.any("SELECT * FROM planets;");
    res.status(200).json(planets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPlanetById = async (req, res) => {
  const { id } = req.params;
  try {
    const planet = await db.one("SELECT * FROM planets WHERE id=$1;", [id]);
    res.status(200).json(planet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPlanet = async (req, res) => {
  const { name } = req.body;
  try {
    await db.none("INSERT INTO planets (name) VALUES ($1);", [name]);
    res.status(201).json({ message: "Pianeta creato con successo." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePlanet = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await db.none("UPDATE planets SET name=$2 WHERE id=$1;", [id, name]);
    res.status(200).json({ message: "Pianeta aggiornato con successo." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePlanet = async (req, res) => {
  const { id } = req.params;
  try {
    await db.none("DELETE FROM planets WHERE id=$1;", [id]);
    res.status(200).json({ message: "Pianeta eliminato con successo." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const uploadPlanetImage = async (req, res) => {
  const { id } = req.params;
  const imagePath = req.file.path;

  try {
    await db.none("UPDATE planets SET image=$2 WHERE id=$1;", [id, imagePath]);
    res
      .status(200)
      .json({
        message: "Immagine del pianeta caricata con successo.",
        imagePath,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPlanets,
  getPlanetById,
  createPlanet,
  updatePlanet,
  deletePlanet,
  uploadPlanetImage,
};
