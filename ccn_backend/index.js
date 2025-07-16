import cors from "cors";
import express, { urlencoded } from "express";
import { createServer } from "http";
import { StatusCodes } from "http-status-codes";
import { Server } from "socket.io";

import connectDB from "./src/config/dbConfig.js";
import { PORT } from "./src/config/serverConfig.js";
import apiRouter from "./src/routes/apiRoutes.js";
// import apiRouter from "./routes/apiRoutes.js";

const app = express();

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  // messageHandlers(io, socket);
  // messageSocketHandlers(io, socket);
});

app.use(cors("*"));

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
  console.log(req.originalUrl);

  next();
});

app.use("/api", apiRouter);

app.use("/", function (req, res) {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: `Can't find path ${req.originalUrl} on this server!`,
    success: false,
  });
});

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  connectDB();
});
