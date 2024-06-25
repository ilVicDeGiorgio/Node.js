// Database fittizio.
let planets = [
  { id: 1, name: "Mercury" },
  { id: 2, name: "Venus" },
  { id: 3, name: "Earth" },
  { id: 4, name: "Mars" },
];

// Funzione per ottenere tutti i pianeti
const getAll = (req, res) => {
  res.status(200).json(planets);
};

// Funzione per ottenere un pianeta per id
const getOneById = (req, res) => {
  const planetId = parseInt(req.params.id);
  const planet = planets.find((p) => p.id === planetId);
  if (!planet) {
    return res.status(404).json({ error: "Planet not found" });
  }
  res.status(200).json(planet);
};

// Funzione per creare un nuovo pianeta
const create = (req, res) => {
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
};

// Funzione per aggiornare un pianeta per id
const updateById = (req, res) => {
  const planetId = parseInt(req.params.id);
  const newName = req.body.name;

  // Verifica se il pianeta con l'id specificato esiste
  const planet = planets.find((p) => p.id === planetId);
  if (!planet) {
    return res.status(404).json({ error: "Planet not found" });
  }

  planet.name = newName;

  res.status(200).json({ msg: "Planet updated successfully" });
};

// Funzione per eliminare un pianeta per id
const deleteById = (req, res) => {
  const planetId = parseInt(req.params.id);

  const index = planets.findIndex((p) => p.id === planetId);
  if (index === -1) {
    return res.status(404).json({ error: "Planet not found" });
  }

  planets.splice(index, 1);

  res.status(200).json({ msg: "Planet deleted successfully" });
};

module.exports = {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
};
