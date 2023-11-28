
import { Server } from "socket.io";

export default function injectSocketIo(server) {
    const io = new Server(server);

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