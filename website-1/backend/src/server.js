const http = require("http");
const app = require("./app");
const connectDb = require("./config/db");

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDb();
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
};

start();
