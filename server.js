import http from "http";
import { handler } from './build/handler.js'; // <- Import SvelteKit handlers
import injectSocketIo from "./socketinject.js"; // The SocketIO stuff (see next step)
import express from 'express';
const app = express();
const server = http.createServer(app);
const port = process.env.PORT ?? 8000
// Inject SocketIO
injectSocketIo(server)

// SvelteKit handlers
app.use(handler);

server.listen(port, () => {
  console.log('Running on http://localhost:3000');
});
