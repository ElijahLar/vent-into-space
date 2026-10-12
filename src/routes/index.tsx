import { createFileRoute } from "@tanstack/react-router";
import { VentPage } from "@/components/vent/VentPage";

const title = "VENT | Vent Online, Write It, Let It Go";
const description =
  "Need to vent online? Write what's on your mind, send it into a black hole, and let it go. VENT is free, with no account, saved history, or AI response.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ventinto.space/" },
      { property: "og:site_name", content: "Vent" },
      { property: "og:image", content: "https://ventinto.space/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Vent — a black hole for thoughts you want to let go of.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "https://ventinto.space/og-image.png" },
      {
        name: "twitter:image:alt",
        content: "Vent — a black hole for thoughts you want to let go of.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://ventinto.space/" },
      { rel: "help", href: "https://ventinto.space/about.html", title: "About VENT and Privacy" },
    ],
  }),
  component: VentPage,
});
