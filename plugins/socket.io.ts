import io from "socket.io-client";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public;
  const socket = io(config.socketUrl + ":" + config.socketPort, {
    autoConnect: false,
  });

  return {
    provide: {
      io: socket,
    },
  };
});
