// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      socketIOPort: process.env.SOCKET_PORT || 3001,
      socketUrl: process.env.SOCKET_URL || "http://localhost",
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "nuxt-icon"],
  googleFonts: {
    families: {
      Pacifico: true,
      "Titillium Web": [200, 300, 400, 600, 700, 900],
    },
  },
  plugins: ["./plugins/socket.io"],
  nitro: {
    plugins: ["./plugins/socket.io.server"],
  },
});
