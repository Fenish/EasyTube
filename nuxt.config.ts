// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      socketPort: 3001,
      socketUrl: process.env.SOCKET_URL || "http://localhost",
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Pacifico: true,
      "Titillium Web": [200, 300, 400, 600, 700, 900],
    },
  },
  nitro: {
    plugins: ["./plugins/socket.io.server"],
  },
  plugins: ["./plugins/socket.io"],
});
