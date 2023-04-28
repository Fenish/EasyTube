import { Server } from "socket.io";

let count = 10;
export default defineNitroPlugin((nitroApp) => {
  const socketServer = new Server(useRuntimeConfig().public.socketPort, {
    serveClient: false,
    cors: {
      origin: "*",
    },
  });
  socketServer.on("connection", (socket) => {
    socket.emit(SocketEvent.new_count, count);
    socket.on(SocketEvent.up, (message: { value: number }) => {
      count += message.value;
      socketServer.emit(SocketEvent.new_count, count);
    });
    socket.on(SocketEvent.down, (message: { value: number }) => {
      count -= message.value;
      socketServer.emit(SocketEvent.new_count, count);
    });
  });

  socketServer.on("progress", (socket) => {
    let progress = 0;
  });
});
