// seo/restaurant.ts
export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Ресторан «Свои Люди»",
  image: [
    "https://troy-hotel.ru/restaurant/restaurant-1.jpg",
    "https://troy-hotel.ru/restaurant/restaurant-2.jpg",
    "https://troy-hotel.ru/restaurant/restaurant-3.jpg",
  ],
  url: "https://troy-hotel.ru/restaurant",
  telephone: "+7 (993) 303-75-25",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. 1 Мая, 131",
    addressLocality: "Краснодар",
    addressCountry: "RU",
  },
  servesCuisine: ["Европейская", "Русская", "Азиатская"],
  menu: "https://troy-hotel.ru/restaurant#menu",
  acceptsReservations: "True",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://troy-hotel.ru/restaurant",
  },
  hasMenu: [
    {
      "@type": "Menu",
      name: "Горячее и мясо",
      url: "https://troy-hotel.ru/restaurant#menu",
      hasMenuItem: [
        { "@type": "MenuItem", name: "Сковородка с курицей / со свининой" },
        { "@type": "MenuItem", name: "Филе утки" },
        { "@type": "MenuItem", name: "Стейк из сёмги, говядины" },
        { "@type": "MenuItem", name: "Филе судака в сливочно-шпинатном соусе" },
      ],
    },
  ],
};
