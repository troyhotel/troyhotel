// ~/seo/spa.ts
export const spaSEO = {
  title:
    "СПА-комплекс в Парк-отеле «Троя» – отдых, релакс и термальные процедуры",
  meta: [
    {
      name: "description",
      content:
        "Посетите СПА-комплекс Парк-отеля «Троя»: термальная зона, финская сауна, джакузи, бассейн и комфортные зоны отдыха. Подарите себе релакс и восстановление сил.",
    },
    {
      name: "keywords",
      content:
        "СПА Троя, термальная зона, джакузи, финская сауна, бассейн, отдых, релакс, СПА-комплекс, спа-процедуры, расслабление, восстановление",
    },

    // --- Open Graph для VK, Telegram ---
    {
      property: "og:title",
      content:
        "СПА-комплекс в Парк-отеле «Троя» – отдых, релакс и термальные процедуры",
    },
    {
      property: "og:description",
      content:
        "Насладитесь СПА-зонами Парк-отеля «Троя»: термальная зона, финская сауна, джакузи, бассейн и уютные зоны отдыха для полного расслабления.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://troy-hotel.ru/spa" },
    {
      property: "og:image",
      content: "https://troy-hotel.ru/spa/XXXL1.jpg",
    },
    // Дополнительно для Telegram и VK важно указать размер
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: "ru_RU" },
    { property: "og:site_name", content: "Парк-отель «Троя»" },

    // --- Twitter (Telegram читает эти мета тоже) ---
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content:
        "СПА-комплекс в Парк-отеле «Троя» – отдых, релакс и термальные процедуры",
    },
    {
      name: "twitter:description",
      content:
        "Термальная зона, финская сауна, джакузи и бассейн — релакс и восстановление в СПА-комплексе Парк-отеля «Троя».",
    },
    {
      name: "twitter:image",
      content: "https://troy-hotel.ru/spa/XXXL1.jpg",
    },
  ],

  link: [{ rel: "canonical", href: "https://troy-hotel.ru/spa" }],

  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "HealthAndBeautyBusiness",
          name: "СПА-комплекс Парк-отеля «Троя»",
          image: [
            "https://troy-hotel.ru/spa/XXXL1.jpg",
            "https://troy-hotel.ru/spa/thermal-1.jpg",
            "https://troy-hotel.ru/spa/sauna-1.jpg",
          ],
          url: "https://troy-hotel.ru/spa",
          telephone: "+7 (981) 333-34-43",
          address: {
            "@type": "PostalAddress",
            streetAddress: "ул. 1 Мая, 131",
            addressLocality: "Краснодар",
            addressCountry: "RU",
          },
          description:
            "СПА-комплекс Парк-отеля «Троя»: термальная зона, финская сауна, джакузи, бассейн и комфортные зоны отдыха. Полный релакс и восстановление сил.",
          amenityFeature: [
            {
              "@type": "LocationFeatureSpecification",
              name: "Термальная зона",
              value:
                "Турецкий хамам, инфракрасная сауна, джакузи и зона отдыха",
            },
            {
              "@type": "LocationFeatureSpecification",
              name: "Зона сауны",
              value:
                "Финская сауна, подогреваемый бассейн, уютная зона отдыха",
            },
            {
              "@type": "LocationFeatureSpecification",
              name: "Специальное предложение",
              value: "Спа-комплекс всего за 1500 ₽ / час для гостей отеля",
            },
          ],
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://troy-hotel.ru/spa",
          },
        },
        null,
        2
      ),
    },
  ],
};
