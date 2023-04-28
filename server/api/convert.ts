import io from "socket.io-client";
import ytdl from "@distube/ytdl-core";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const videoUrl = query.url;
  const video = await ytdl.getInfo(videoUrl as string);
  return {
    video,
  };
});
