// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      SOCKET_PORT: 5000,
      SOCKET_URL: process.env.SOCKET_URL || "http://localhost:5000",
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-icon",
    "nuxt-security",
  ],
  googleFonts: {
    families: {
      Pacifico: true,
      "Titillium Web": [200, 300, 400, 600, 700, 900],
    },
  },
  plugins: ["./plugins/socket.io"],
  nitro: {
    plugins: ["@/socket/socket.io.server"],
  },
  security: {
    headers: {
      contentSecurityPolicy: false,
    },
  },
});
