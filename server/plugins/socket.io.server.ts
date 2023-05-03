import { Server } from "socket.io";
import ytdl from "@distube/ytdl-core";

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig().public;
  const server = new Server(config.socketPort, {
    serveClient: false,
    cors: {
      origin: "*",
    },
  });
  server.on("connection", (socket) => {
    socket.on(VideoEvents.get_data, async (message: { url: string }) => {
      const video = await ytdl.getInfo(message.url);
      socket.emit(VideoEvents.video_info, video);
    });
  });
});
