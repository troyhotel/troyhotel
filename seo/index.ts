// seo/index.ts
export const seo = {
  title: 'Парк-отель «Троя» в Краснодаре — комфортные номера, ресторан, спа и мероприятия',
  meta: [
    {
      name: 'description',
      content:
        'Парк-отель «Троя» в Краснодаре: комфортабельные номера, ресторан европейской и кавказской кухни, спа-комплекс с бассейном, банкетные и конференц-залы. Идеально для отдыха, деловых встреч и мероприятий.',
    },
    {
      name: 'keywords',
      content:
        'парк-отель Троя, отель Краснодар, номера Краснодар, банкетный зал, спа-комплекс, ресторан Краснодар, конференции Краснодар, отдых Краснодар',
    },
    { property: 'og:title', content: 'Парк-отель «Троя» — отдых, бизнес и мероприятия в Краснодаре' },
    { property: 'og:description', content: 'Уютные номера, спа, ресторан, банкетные и конференц-залы. 20 минут пешком до Парка Галицкого и стадиона Краснодар. Идеальное место для отдыха и деловых встреч.' },
    { property: 'og:image', content: 'https://troy-hotel.ru/home/home-2.jpg' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://troy-hotel.ru/' },
  ],
  link: [
    { rel: 'canonical', href: 'https://troy-hotel.ru/' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": "Парк-отель «Троя»",
        "image": [
          "https://troy-hotel.ru/home/home-3.jpg",
          "https://troy-hotel.ru/home/about-events/1.jpg",
          "https://troy-hotel.ru/home/about-events/2.jpg"
        ],
        "@id": "https://troy-hotel.ru/",
        "url": "https://troy-hotel.ru/",
        "telephone": "+7 (981) 333-34-43",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. 1 Мая, 131",
          "addressLocality": "Краснодар",
          "postalCode": "350000",
          "addressCountry": "RU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 45.0355,
          "longitude": 38.9753
        },
        "priceRange": "от 3500₽/ночь",
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Спа-комплекс", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Бассейн", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Ресторан", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Бесплатная парковка", "value": true }
        ],
      }),
    },
  ],
}
