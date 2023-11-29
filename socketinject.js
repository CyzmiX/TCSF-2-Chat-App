import { Server } from "socket.io";

export default function injectSocketIo(server) {
    const socketIo = new Server(server);
 
    socketIo.on("connection", (socket) => {
		console.log(socket.id, " connected")
		socket.on('loggedin', () => {
			console.log('ff')
		})

        socket.on('msg', ({ msg, userName, type, avatarSrc }) => {
            socket.broadcast.emit('msg', {
                msg,
                type,
                userName,
                avatarSrc2: avatarSrc
            })
        })

		socket.on('reply', ({ msg, userName, type, reply, avatarSrc }) => {
			socket.broadcast.emit('reply', {
				msg,
				type,
				userName,
				reply,
                avatarSrc2: avatarSrc
			})
		})
    });
}