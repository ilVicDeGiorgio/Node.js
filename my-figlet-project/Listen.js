const { EventEmitter } = require("events");

function createNewsFeed() {
  const emitter = new EventEmitter();

  setInterval(() => {
    emitter.emit("newsEvent", "News: A thing happened in a place.");
  }, 1000);

  setInterval(() => {
    emitter.emit("breakingNews", "Breaking news! A BIG thing happened.");
  }, 4000);

  setTimeout(() => {
    emitter.emit("error", new Error("News feed connection error"));
  }, 5000);

  return emitter;
}

const newsFeed = createNewsFeed();

// Collegare ascoltatori di eventi
newsFeed.on("newsEvent", (message) => {
  console.log(`News Event: ${message}`);
});

newsFeed.on("breakingNews", (message) => {
  console.log(`Breaking News: ${message}`);
});

newsFeed.on("error", (error) => {
  console.error(`Error: ${error.message}`);
});
