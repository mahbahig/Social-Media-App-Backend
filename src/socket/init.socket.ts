import { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { authSocketMiddleware } from "./middlewares";
import chalk from "chalk";

const connectedClients = new Map<string, string>();

export const initSocket = (server: HttpServer) => {
    console.log(chalk.bold.blueBright("Initializing Socket.io..."));
    const io = new Server(server, { cors: { origin: "*" } });
    io.use(authSocketMiddleware);
    io.on("connection", (socket) => {
        connectedClients.set(socket.data.user, socket.id);
        console.log("New client connected:", socket.id);
    });
};