import io from "socket.io-client";
import ytdl from "@distube/ytdl-core";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const videoUrl = query.url;
  const video = await ytdl.getInfo(videoUrl as string);
  console.log("bitti");
  return {
    video,
  };
  // const runJob = pProgress(async (progress) => {
  //   await ytdl.getInfo(videoUrl as string);
  // });
  // runJob.onProgress(console.log);
  // return {
  //   test: runJob,
  // };
});
