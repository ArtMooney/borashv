import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    mailgunApiKey: process.env.NUXT_MAILGUN_API_KEY,
    emailFrom: process.env.NUXT_EMAIL_FROM,
    emailTo: process.env.NUXT_EMAIL_TO,
    userName: process.env.NUXT_USERNAME,
    userPass: process.env.NUXT_USERPASS,
    baserowUsername: process.env.NUXT_BASEROW_USERNAME,
    baserowPassword: process.env.NUXT_BASEROW_PASSWORD,
    baserowDbId: process.env.NUXT_BASEROW_DB_ID,
    baserowBackendToken: process.env.NUXT_BASEROW_BACKEND_TOKEN,

    public: {
      userName: process.env.NUXT_PUBLIC_USERNAME,
      userPass: process.env.NUXT_PUBLIC_USERPASS,
      baserowClientToken: process.env.NUXT_PUBLIC_BASEROW_CLIENT_TOKEN,
      baserowBokningar: process.env.NUXT_PUBLIC_BASEROW_BOKNINGAR,
      baserowNyheter: process.env.NUXT_PUBLIC_BASEROW_NYHETER,
      baserowStyrelsen: process.env.NUXT_PUBLIC_BASEROW_STYRELSEN,
      baserowDokument: process.env.NUXT_PUBLIC_BASEROW_DOKUMENT,
    },
  },
  modules: ["@nuxtjs/robots", "nuxt-simple-sitemap"],
  robots: {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        sitemap: "https://borashv.se/sitemap.xml",
      },
      {
        UserAgent: "*",
        Disallow: "/",
        Host: "borashv.pages.dev",
      },
    ],
  },
  sitemap: {
    hostname: "https://borashv.se",
    gzip: true,
  },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "canonical", href: "https://borashv.se/" },
      ],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "",
      meta: [
        {
          name: "description",
          content: "",
        },
        {
          name: "keywords",
          content: "",
        },

        // Open Graph / Facebook
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://borashv.se/" },
        {
          property: "og:title",
          content: "",
        },
        {
          property: "og:description",
          content: "",
        },
        {
          property: "og:image",
          content: "https://borashv.se/og-image.jpg",
        },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:url", content: "https://borashv.se/" },
        {
          name: "twitter:title",
          content: "",
        },
        {
          name: "twitter:description",
          content: "",
        },
        {
          name: "twitter:image",
          content: "https://borashv.se/twitter-image.jpg",
        },
      ],
    },
  },
});
