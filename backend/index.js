const connectToMongo = require("./db");
const cors = require("cors");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const initLiveStream = require("./Controllers/liveStreamVideoSocket");
const overlayRoute = require("./routes/overlayRoute");

connectToMongo();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer);
initLiveStream(io);

app.use("/api/overlays", overlayRoute);

httpServer.listen(port, () => {
  console.log(`LiveSitter Backend listening on port:${port}`);
});
