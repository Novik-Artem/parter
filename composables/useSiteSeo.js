const SITE_NAME = "ПАРТЕР 162";
const SITE_TAGLINE = "Создаём воспоминания";
const SITE_DESCRIPTION =
  "Живая музыка на свадьбу, юбилей и другие события. Команда ПАРТЕР 162 — истинно живая музыка и настоящие эмоции.";
const SITE_KEYWORDS =
  "партер 162, живая музыка, свадьба, юбилей, музыканты, кавер группа, мероприятие, брест, Беларусь";

export function useSiteSeo() {
  const config = useRuntimeConfig();
  const siteUrl = config.public.siteUrl.replace(/\/$/, "");

  return {
    siteUrl,
    siteName: SITE_NAME,
    siteTagline: SITE_TAGLINE,
    siteDescription: SITE_DESCRIPTION,
    siteKeywords: SITE_KEYWORDS,
    ogImage: `${siteUrl}/og-image.png`,
    canonicalUrl: siteUrl,
  };
}
