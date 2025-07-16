import cors from "cors";
import express, { urlencoded } from "express";
import { createServer } from "http";
import { StatusCodes } from "http-status-codes";
import { Server } from "socket.io";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./src/config/dbConfig.js";
import { PORT } from "./src/config/serverConfig.js";
import apiRouter from "./src/routes/apiRoutes.js";

const app = express();

app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  keyGenerator: (req) => {
    return req?.body?.phone || "";
  },
  max: 7,
  handler: (req, res, next, options) => {
    const rateLimitLimit = res.getHeader("ratelimit-reset");
    const callLimit = res.getHeader("ratelimit-limit");

    res.status(429).json({
      status: "fail",
      error: "Too Many Requests",
      message: `You have exceeded the limit of ${callLimit} requests in 15 minutes. Please try again after ${Math.ceil(
        rateLimitLimit / 60
      )} minutes.`,
    });
  },

  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/v1/users/signin", apiLimiter);

app.use(
  cors({
    origin: "http://localhost:5173", // or whatever port Vite is running on
    credentials: true,
  })
);
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (candidateId) => {
    socket.join(candidateId);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.candidateId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

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
