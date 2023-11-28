import http from "http";
import { handler } from './build/handler.js'; // <- Import SvelteKit handlers
import injectSocketIo from "./socketinject.js"; // The SocketIO stuff (see next step)
import express from 'express';

const app = express();
const server = http.createServer(app);

// Inject SocketIO
injectSocketIo(server)

// SvelteKit handlers
app.use(handler);

server.listen(process.env.PORT || 3000, () => {
  console.log('Running on http://localhost:3000');
});
