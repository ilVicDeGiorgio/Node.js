const express = require("express");
const router = express.Router();

// Database fittizio.
let planets = [
  { id: 1, name: "Mercury" },
  { id: 2, name: "Venus" },
  { id: 3, name: "Earth" },
  { id: 4, name: "Mars" },
];

// Middleware per il parsing del corpo delle richieste
router.use(express.json());

// GET /api/planets - restituisce tutti i pianeti
router.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});

// GET /api/planets/:id - restituisce un pianeta tramite id
router.get("/api/planets/:id", (req, res) => {
  const planetId = parseInt(req.params.id);
  const planet = planets.find((p) => p.id === planetId);
  if (!planet) {
    return res.status(404).json({ error: "Planet not found" });
  }
  res.status(200).json(planet);
});

// POST /api/planets - crea un nuovo pianeta
router.post("/api/planets", (req, res) => {
  const { id, name } = req.body;

  // Verifica che id e name siano presenti nel body
  if (!id || !name) {
    return res.status(400).json({ error: "Both id and name are required" });
  }

  // Verifica se esiste già un pianeta con lo stesso id
  if (planets.some((p) => p.id === id)) {
    return res
      .status(400)
      .json({ error: "Planet with this id already exists" });
  }

  planets.push({ id, name });

  res.status(201).json({ msg: "Planet created successfully" });
});

// PUT /api/planets/:id - aggiorna un pianeta tramite id
router.put("/api/planets/:id", (req, res) => {
  const planetId = parseInt(req.params.id);
  const newName = req.body.name;

  // Verifica se il pianeta con l'id specificato esiste
  const planet = planets.find((p) => p.id === planetId);
  if (!planet) {
    return res.status(404).json({ error: "Planet not found" });
  }

  planet.name = newName;

  res.status(200).json({ msg: "Planet updated successfully" });
});

// DELETE /api/planets/:id - elimina un pianeta per id
router.delete("/api/planets/:id", (req, res) => {
  const planetId = parseInt(req.params.id);

  const index = planets.findIndex((p) => p.id === planetId);
  if (index === -1) {
    return res.status(404).json({ error: "Planet not found" });
  }

  planets.splice(index, 1);

  res.status(200).json({ msg: "Planet deleted successfully" });
});

module.exports = router;
