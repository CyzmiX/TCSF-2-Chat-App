import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { Server } from 'socket.io';

import type { PluginOption } from "vite";

const socketioServer: PluginOption = {
  name: "socketioServer",
  configureServer(server) {
    if (server.httpServer) {
      const io = new Server(server.httpServer);

      io.on("connection", (socket) => {
		console.log(socket.id, " connected")
		socket.on('loggedin', () => {
			console.log('ff')
		})

		socket.on('msg', ({ msg, userName, type }) => {
			socket.broadcast.emit('msg', {
				msg,
				type,
				userName
			})
		})
      });
    }
  },
};


export default defineConfig({
	plugins: [sveltekit(), socketioServer]
});
