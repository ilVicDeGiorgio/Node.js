import { createServer } from "node:http";

const server = createServer((request, response) => {
  console.log("Request received");

  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");

  const originalJson = {
    id: 195,
    name: "Kristen Stewart",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Female",
    origin: {
      name: "Earth (C-500A)",
      url: "https://rickandmortyapi.com/api/location/23",
    },
    location: {
      name: "Earth (C-500A)",
      url: "https://rickandmortyapi.com/api/location/23",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/195.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/8"],
    url: "https://rickandmortyapi.com/api/character/195",
    created: "2017-12-30T12:19:16.042Z",
  };

  const updatedJson = { ...originalJson };

  updatedJson.location.name = "Mars";

  const jsonResponseBody = JSON.stringify(updatedJson);
  response.setHeader("Content-Length", Buffer.byteLength(jsonResponseBody));

  response.end(jsonResponseBody);
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
