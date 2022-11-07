const reviews = [
  {
    id: "review:1",
    productId: "product:1",
    rating: 4.8,
    content: "This is great!",
  },
  {
    id: "review:2",
    productId: "product:1",
    rating: 4.8,
    content: "This is great!",
  },
  {
    id: "review:3",
    productId: "product:1",
    rating: 5.0,
    content: "This is great!",
  },
];

const averages = [{ productId: "product:1", average: 4.9 }];

const getReviewById = (id) => reviews.find((it) => it.id === id);
const getProductReviews = (productId) =>
  reviews.filter((it) => it.productId == productId);
const getProductReviewAverage = (productId) =>
  averages.find((it) => it.productId === productId)?.average ?? 0;

module.exports = { getReviewById, getProductReviews, getProductReviewAverage };
