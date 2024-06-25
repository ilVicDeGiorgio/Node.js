const express = require("express");
const planetRouter = require("./planetRouter");

const app = express();
const port = 3000;

// Middleware per il parsing del corpo delle richieste
app.use(express.json());

app.use("/", planetRouter);

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
