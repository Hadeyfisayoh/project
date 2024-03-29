const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planet.model");
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
  await loadPlanetsData();
}

server.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}....`);
});

startServer();
