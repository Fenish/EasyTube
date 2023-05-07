import io from "socket.io-client";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public;
  const socket = io(config.socketUrl + ":" + config.socketIOPort, {
    autoConnect: false,
  });

  return {
    provide: {
      io: socket,
    },
  };
});
