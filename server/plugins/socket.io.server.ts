import { Server } from "socket.io";
import ytdl from "@distube/ytdl-core";

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig().public;
  const server = new Server(config.socketIOPort, {
    serveClient: false,
    cors: {
      origin: "*",
    },
  });
  server.on("connection", (socket) => {
    let progress = 0;
    socket.on(VideoEvents.get_data, async (message: { url: string }) => {
      const video = await ytdl.getInfo(message.url);
      socket.emit(VideoEvents.video_info, video);
    });
    socket.on(
      VideoEvents.start_download,
      async (message: { url: string; format: string }) => {
        let FILTER: "audioonly" | "audioandvideo" = "audioonly";
        if (message.format.toLowerCase() === "mp4") {
          FILTER = "audioandvideo";
        }

        const video = await ytdl.getInfo(message.url);
        const stream = ytdl.downloadFromInfo(video, {
          filter: FILTER,
          quality: "highest",
        });

        const chunks: Buffer[] = [];
        stream.on("data", (chunk) => {
          chunks.push(chunk);
        });

        stream.on("end", () => {
          socket.emit(VideoEvents.video_blob, chunks);
        });

        stream.on("progress", (_, downloaded, total) => {
          const newProgress = Math.floor((downloaded / total) * 100);
          if (newProgress > progress) {
            progress = newProgress;
            socket.emit(ProgressEvents.progress_status, progress);
          }
        });
        stream.on("finish", () => {
          progress = 100;
          socket.emit(ProgressEvents.progress_status, progress);
          progress = 0;
        });
      }
    );
    socket.on(ProgressEvents.new_progress, (message: { progress: number }) => {
      progress = message.progress;
      socket.emit(ProgressEvents.progress_status, progress);
    });
  });
});
