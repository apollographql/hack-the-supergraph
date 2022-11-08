const reviews = [
  {
    id: "review:1",
    productId: "product:1",
    rating: 5.0,
    content: "I love this t-shirt so much! ❤️ It's just so soft and I've had it for years now.",
  },
  {
    id: "review:2",
    productId: "product:1",
    rating: 4.8,
    content: "Usually don't write reviews, but I wear this shirt a couple times every week and that's saying a lot.",
  },
  {
    id: "review:3",
    productId: "product:1",
    rating: 3.0,
    content: "It's just a shirt 🤷‍♂️",
  },
];

// const averages = [{ productId: "product:1", average: 4.9 }];

const getReviewById = (id) => reviews.find((it) => it.id === id);
const getProductReviews = (productId) =>
  reviews.filter((it) => it.productId == productId);
const getProductReviewAverage = (productId) =>{
  let counter = 0;
  let total = 0;
  reviews.forEach(r=>{
    if(r.productId == productId){
      counter ++;
      total += r.rating
    }
  })

  return total / counter;
}
  // averages.find((it) => it.productId === productId)?.average ?? 0;

module.exports = { getReviewById, getProductReviews, getProductReviewAverage };
