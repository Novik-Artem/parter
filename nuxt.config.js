import { cssModuleScopedName, viteStyleHmrFix } from "./config/vite-style-hmr-fix.js";

const siteUrl =
  process.env.NUXT_PUBLIC_SITE_URL || "https://parter-eosin.vercel.app";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  ssr: true,
  css: ["~/assets/styles/fonts.scss", "~/assets/styles/reset.scss"],
  runtimeConfig: {
    public: {
      siteUrl,
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: "ru" },
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  vite: {
    plugins: [viteStyleHmrFix()],
    css: {
      modules: {
        generateScopedName:
          process.env.NODE_ENV === "development"
            ? cssModuleScopedName
            : undefined,
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/component.scss" as *;',
        },
      },
    },
  },
});
