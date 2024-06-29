// app.js
const express = require("express");
const bodyParser = require("body-parser");
const planetsController = require("./planetsController");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/planets", planetsController.getAllPlanets);
app.get("/planets/:id", planetsController.getPlanetById);
app.post("/planets", planetsController.createPlanet);
app.put("/planets/:id", planetsController.updatePlanet);
app.delete("/planets/:id", planetsController.deletePlanet);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
