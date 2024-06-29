// app.js
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const planetsController = require("./planetsController");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configurazione di multer per il caricamento dei file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route per caricare l'immagine del pianeta
app.post(
  "/planets/:id/image",
  upload.single("planetImage"),
  planetsController.uploadPlanetImage
);

// Altre route CRUD per i pianeti
app.get("/planets", planetsController.getAllPlanets);
app.get("/planets/:id", planetsController.getPlanetById);
app.post("/planets", planetsController.createPlanet);
app.put("/planets/:id", planetsController.updatePlanet);
app.delete("/planets/:id", planetsController.deletePlanet);

app.listen(port, () => {
  console.log(`Il server è in esecuzione su http://localhost:${port}`);
});
