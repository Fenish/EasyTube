import io from "socket.io-client";
import ytdl from "@distube/ytdl-core";

const config = useRuntimeConfig().public;
const socket = io(`${config.socketUrl}:${config.socketPort}`, {
  autoConnect: false,
});

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function estimator(estimate: number = 3000) {
  const duration = 5000;
  const increment = 10 / duration;

  let count = 0;
  const startTime = Date.now();

  while (count < 100 && (count += increment * (Date.now() - startTime)) < 100) {
    count += increment * (Date.now() - startTime);
    socket.emit("converting", { value: Math.round(count) });

    await wait(100);
  }
}

export default defineEventHandler(async (event) => {
  socket.connect();
  console.log(socket.connected);
  const query = getQuery(event);
  const videoUrl = query.url;
  const estimatePromise = estimator();
  const videoPromise = ytdl.getInfo(videoUrl as string);

  const result = await Promise.all([estimatePromise, videoPromise]);
  socket.emit("converting", { value: 100 });
  console.log("finished");

  return {
    result,
  };
  // const runJob = pProgress(async (progress) => {
  //   await ytdl.getInfo(videoUrl as string);
  // });
  // runJob.onProgress(console.log);
  // return {
  //   test: runJob,
  // };
});
