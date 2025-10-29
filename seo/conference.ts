export const conferenceSeo = {
  title: "Конференц-зал в Парк-отеле «Троя» – деловые мероприятия и встречи",
  meta: [
    {
      name: "description",
      content:
        "Организуйте деловые встречи, тренинги, презентации и мастер-классы в современном конференц-зале Парк-отеля «Троя». Просторный зал для до 50 участников с полным оснащением и дополнительными сервисами.",
    },
    {
      name: "keywords",
      content:
        "конференц-зал Троя, деловые мероприятия, тренинги, мастер-классы, презентации, встречи, бизнес-зал, аренда зала, корпоративные мероприятия, СПА, ресторан",
    },
    {
      property: "og:title",
      content:
        "Конференц-зал в Парк-отеле «Троя» – деловые мероприятия и встречи",
    },
    {
      property: "og:description",
      content:
        "Проведите эффективное мероприятие в конференц-зале парк-отеля «Троя»: современное оборудование, комфортная рассадка, сопровождение персонального менеджера и дополнительные сервисы.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://troy-hotel.ru/conference" },
  ],
  link: [{ rel: "canonical", href: "https://troy-hotel.ru/conference" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Конференц-зал в Парк-отеле «Троя»",
        url: "https://troy-hotel.ru/conference",
        description:
          "Организуйте деловые встречи, тренинги, презентации и мастер-классы в современном конференц-зале Парк-отеля «Троя». Просторный зал для до 50 участников с полным оснащением и дополнительными сервисами.",
        mainEntity: {
          "@type": "EventVenue",
          name: "Конференц-зал Парк-отеля «Троя»",
          description:
            "Современный конференц-зал для деловых встреч, тренингов и мастер-классов.",
          image: [
            "https://troy-hotel.ru/conference/XXXL1.jpg",
            "https://troy-hotel.ru/conference/conference-1.jpg",
            "https://troy-hotel.ru/conference/conference-2.jpg",
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
              name: "Бизнес-встречи, тренинги, мероприятия",
              description:
                "Профессиональная атмосфера с полным техническим оснащением для эффективной работы.",
            },
            {
              "@type": "Event",
              name: "Нетворкинги",
              description:
                "Пространство, где удобно знакомиться, обмениваться опытом и налаживать деловые связи.",
            },
            {
              "@type": "Event",
              name: "Мастер-классы и презентации",
              description:
                "Удобная рассадка, проектор, экран и зоны для демонстрации продуктов или обучения.",
            },
            {
              "@type": "Event",
              name: "Форумы",
              description:
                "Вместимость до 50 человек, гибкие форматы посадки и сопровождение персонального менеджера.",
            },
          ],
        },
      }),
    },
  ],
};
