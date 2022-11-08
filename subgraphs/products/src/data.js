const PRODUCTS = [
  {
    id: "product:5",
    title: "Soft Warm Apollo Beanie",
    description:
      "Beat the cold with this 100% organice cotton beanie. It's extremely soft just like our t-shirts!",
    mediaUrl:
      "https://storage.googleapis.com/hack-the-supergraph/apollo-beanie.jpg",
  },
  {
    id: "product:2",
    title: "Stainless Steel Water Bottle",
    description:
      "A classic stainless steel water bottle that can hold 22oz of your favorite drink. It's insulated so it can keep your beverage hot or cold for up to 10 hours!",
    mediaUrl:
      "https://storage.googleapis.com/hack-the-supergraph/apollo-bottle.jpg",
  },
  {
    id: "product:3",
    title: "Athletic Baseball Cap",
    description:
      "Make sure to grab this baseball cap the next time you go outside!",
    mediaUrl:
      "https://storage.googleapis.com/hack-the-supergraph/apollo-cap.jpg",
  },
  {
    id: "product:4",
    title: "Baby Onesies",
    description:
      "A short-sleeve bodysuit made with 100% organic cotton to be soft and gentle against baby's skin.",
    mediaUrl: "https://storage.googleapis.com/hack-the-supergraph/apollo-onesie.jpg",
  },
  {
    id: "product:1",
    title: "The Apollo T-Shirt",
    description:
      "The classic Apollo T-Shirt made with 100% organic cotton. So soft that you'll be wearing it for years!",
    mediaUrl: "https://storage.googleapis.com/hack-the-supergraph/apollo-shirt.jpg",
  },
  {
    id: "product:6",
    title: "The Apollo Socks",
    description:
      "Of course there are socks with Apollo logos on them!",
    mediaUrl: "https://storage.googleapis.com/hack-the-supergraph/apollo-socks.jpg",
  },
];

const getProductById = (id) => PRODUCTS.find((it) => it.id === id);

module.exports = { getProductById, PRODUCTS };
