import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

// Carica le variabili di ambiente dal file .env
dotenv.config();

// Inizializza l'app Express
const app = express();

// Porta specificata nel file .env
const port = process.env.PORT || 3000;

// Configura l'app per accettare JSON dal client
app.use(express.json());

// Configura l'app per registrare le richieste del cliente
app.use(morgan('dev'));

// Dati che avevo già (Fittizi)
type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

app.get('/', (req, res) => {
  res.json(planets);
});

// Avvia il server
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
