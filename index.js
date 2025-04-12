import express from "express";
import { Server } from "socket.io";
import { voiceCallListener } from "./voiceCall.js";
import { createServer } from "http";
import mongoose from "mongoose";
const app = express();
const server = createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected socketId : ", socket.id);
  io.to(socket.id).emit("connected", {
    socketId: socket.id,
  });
  voiceCallListener(socket, io);
});
const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jmahato686:qSroxbDMHeWnYXTk@webrtc.xigqz.mongodb.net/?retryWrites=true&w=majority&appName=webRtc"
    );
    server.listen(3000, () => {
      console.log("server running at port 3000");
    });
  } catch (error) {
    console.log("Error while connecting to database", error);
  }
};
startServer();
