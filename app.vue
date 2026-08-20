<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const {
  siteUrl,
  siteName,
  siteTagline,
  siteDescription,
  siteKeywords,
  ogImage,
  canonicalUrl,
} = useSiteSeo();

const title = `${siteName} — ${siteTagline}`;

useHead({
  htmlAttrs: {
    lang: "ru",
  },
  title,
  titleTemplate: (chunk) =>
    chunk && chunk !== title ? `${chunk} | ${siteName}` : title,
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "format-detection", content: "telephone=no" },
    { name: "theme-color", content: "#000000" },
    { name: "color-scheme", content: "dark" },
    { name: "author", content: siteName },
    {
      name: "robots",
      content:
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    { name: "googlebot", content: "index, follow" },
    { name: "yandex", content: "index, follow" },
  ],
  link: [
    { rel: "canonical", href: canonicalUrl },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    { rel: "shortcut icon", href: "/favicon.ico" },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: siteUrl,
            name: siteName,
            description: siteDescription,
            inLanguage: "ru-RU",
            publisher: { "@id": `${siteUrl}/#organization` },
          },
          {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
            name: siteName,
            legalName: 'ООО "МУЗ-ПРОСТОР"',
            url: siteUrl,
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/android-chrome-512x512.png`,
            },
            image: ogImage,
            description: siteDescription,
            address: {
              "@type": "PostalAddress",
              streetAddress: "ул. Катин Бор, д.107Б, оф.4",
              addressLocality: "Брест",
              postalCode: "224701",
              addressCountry: "BY",
            },
            sameAs: [
              "https://www.instagram.com/parter162?igsh=MWI2bjNzdjEwODBqdw==",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+375-33-353-43-22",
              contactType: "customer service",
              availableLanguage: ["Russian"],
            },
          },
          {
            "@type": "MusicGroup",
            "@id": `${siteUrl}/#musicgroup`,
            name: siteName,
            url: siteUrl,
            description: siteDescription,
            genre: ["Live music", "Cover", "Wedding music"],
            sameAs: [
              "https://www.instagram.com/parter162?igsh=MWI2bjNzdjEwODBqdw==",
            ],
          },
        ],
      }),
    },
  ],
});

useSeoMeta({
  description: siteDescription,
  keywords: siteKeywords,
  ogType: "website",
  ogSiteName: siteName,
  ogTitle: title,
  ogDescription: siteDescription,
  ogUrl: canonicalUrl,
  ogLocale: "ru_RU",
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: `${siteName} — живая музыка на мероприятия`,
  ogImageType: "image/png",
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: siteDescription,
  twitterImage: ogImage,
  twitterImageAlt: `${siteName} — живая музыка на мероприятия`,
});
</script>
