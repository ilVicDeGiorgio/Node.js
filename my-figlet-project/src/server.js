const express = require("express");
const planetRouter = require("./planetRouter");

const app = express();
const port = 3000;

// Middleware per il parsing del corpo delle richieste
app.use(express.json());

// Usa il router dei pianeti per tutte le rotte /api/planets
app.use("/", planetRouter);

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
