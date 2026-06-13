/** Local trust photography — served from /public/images */

export const siteImages = {
  hero: "/images/hero.png",
  about: "/images/gau-seva-riverside.jpeg",
  vision: "/images/hero.png",
  pillars: {
    gauSeva: "/images/gau-seva-blessing.jpeg",
    spiritualTeachings: "/images/gau-seva-gaushala.jpeg",
    naamSankirtan: "/images/sankirtan-bhajan.jpeg",
  },
  gallery: [
    {
      _id: "local-1",
      url: "/images/gau-seva-feeding.jpeg",
      publicId: "local",
      category: "gau-seva" as const,
      caption: "Gau Mata Seva — Feeding with devotion",
    },
    {
      _id: "local-2",
      url: "/images/gau-seva-blessing.jpeg",
      publicId: "local",
      category: "gau-seva" as const,
      caption: "Blessing Gau Mata with love",
    },
    {
      _id: "local-3",
      url: "/images/gau-seva-gaushala.jpeg",
      publicId: "local",
      category: "gau-seva" as const,
      caption: "Our Gau Shala — Sacred protection",
    },
    {
      _id: "local-4",
      url: "/images/gau-seva-riverside.jpeg",
      publicId: "local",
      category: "gau-seva" as const,
      caption: "Seva by the sacred waters",
    },
   
  ],
};
