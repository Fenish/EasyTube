// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      socketUrl: process.env.SOCKET_URL || "http://localhost:3000",
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
  security: {
    headers: {
      contentSecurityPolicy: false,
    },
  },
});
