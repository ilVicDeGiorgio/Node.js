import fs from "node:fs";

const content = "Questo è il contenuto del file di testo";

fs.writeFile("output.txt", content, (err) => {
  if (err) {
    console.error("Errore durante la scrittura del file:", err);
  } else {
    console.log("File scritto con successo!");
  }
});
