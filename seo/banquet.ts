// seo/banquet.ts
export const banquetJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Банкетный зал Парк-отеля «Троя»",
  url: "https://troy-hotel.ru/banquet",
  description:
    "Банкетный зал и ресторан «Свои Люди» в Парк-отеле «Троя» – идеальное место для свадеб, юбилеев, корпоративов и частных торжеств до 65 гостей. Организация «под ключ», индивидуальное меню, декор, ведущий и музыкальное сопровождение.",
  mainEntity: {
    "@type": "EventVenue",
    name: "Банкетный зал и ресторан «Свои Люди»",
    description:
      "Современный банкетный зал для свадеб, юбилеев, корпоративов и других торжеств.",
    image: [
      "https://troy-hotel.ru/banquet/XXXL1.jpg",
      "https://troy-hotel.ru/banquet/banquet.jpg",
      "https://troy-hotel.ru/banquet/celebration-1.jpg",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. 1 Мая, 131",
      addressLocality: "Краснодар",
      addressCountry: "RU",
    },
    event: [
      {
        "@type": "Event",
        name: "Свадьбы и выездные регистрации",
        description:
          "Красивые истории любви с трогательной атмосферой и идеальным оформлением.",
      },
      {
        "@type": "Event",
        name: "Юбилеи и семейные торжества",
        description:
          "Уютные праздники для самых родных — со вкусом, теплом и заботой.",
      },
      {
        "@type": "Event",
        name: "Деловые встречи и вечера для партнеров",
        description:
          "Престижное пространство для делового общения и укрепления связей.",
      },
      {
        "@type": "Event",
        name: "Фуршеты и дни рождения",
        description:
          "Неформальные встречи с лёгкой подачей, живым настроением и вкусными блюдами.",
      },
      {
        "@type": "Event",
        name: "Корпоративы и новогодние вечера",
        description:
          "Яркие события, которые сплачивают команду и создают настроение.",
      },
    ],
  },
};
