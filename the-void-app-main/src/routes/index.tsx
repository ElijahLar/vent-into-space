import { createFileRoute } from "@tanstack/react-router";
import { VentPage } from "@/components/vent/VentPage";

const title = "Vent — Say it. Send it. Gone.";
const description =
  "A private place to get something out of your head. Type it, send it into the void, and it disappears. Vent never saves or uploads your vent text.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Vent" },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Vent — a black hole for thoughts you want to let go of.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "/og-image.png" },
      {
        name: "twitter:image:alt",
        content: "Vent — a black hole for thoughts you want to let go of.",
      },
    ],
  }),
  component: VentPage,
});
