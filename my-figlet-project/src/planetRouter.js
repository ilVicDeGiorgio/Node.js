const express = require("express");
const router = express.Router();
const planetsController = require("../src/Controllers/planets");

// Middleware per il parsing del corpo delle richieste
router.use(express.json());

// GET /api/planets - restituisce tutti i pianeti
router.get("/planets", planetsController.getAll);

// GET /api/planets/:id - restituisce un pianeta tramite id
router.get("/planets/:id", planetsController.getOneById);

// POST /api/planets - crea un nuovo pianeta
router.post("/planets", planetsController.create);

// PUT /api/planets/:id - aggiorna un pianeta tramite id
router.put("/planets/:id", planetsController.updateById);

// DELETE /api/planets/:id - elimina un pianeta per id
router.delete("/planets/:id", planetsController.deleteById);

module.exports = router;
