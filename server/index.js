import express from 'express';

import { Server as SocketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';


const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});


//app use
app.use(cors());

//Socket
io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on("message", (message) => {
        console.log(message)
        socket.broadcast.emit("message", {
            body: message,
            from: "Usuario",
        });
    });
});


//Mongodb
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/ `)
})









