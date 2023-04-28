import { Server } from "socket.io";

export default defineNitroPlugin(() => {
  const socketServer = new Server(useRuntimeConfig().public.socketPort, {
    serveClient: false,
    cors: {
      origin: "*",
    },
  });

  socketServer.on("connection", (socket) => {
    let progress = 0;
    socket.emit(ConvertProgress.current_progress, progress);
    socket.on(ConvertProgress.reset, () => {
      progress = 0;
      socket.emit(ConvertProgress.current_progress, progress);
    });
    socket.on(ConvertProgress.converting, (message: { value: number }) => {
      progress += message.value;
      if (progress >= 101) {
        socket.emit(ConvertProgress.converted, "Done!");
      } else {
        socket.emit(ConvertProgress.current_progress, progress);
      }
    });
  });

  socketServer.on("progress", (socket) => {
    let progress = 0;
  });
});
