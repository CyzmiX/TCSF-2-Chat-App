// server.js
import http from "http";
import { handler } from "./build/handler.js";
import express from "express";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

// Inject SocketIO

const io = new Server(server);

io.on("connection", () => {
    console.log('new user')
})
// SvelteKit handlers
app.use(handler);

server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});