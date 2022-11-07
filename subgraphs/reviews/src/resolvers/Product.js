const { getProductReviews, getProductReviewAverage } = require("../data");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = () => Math.floor(Math.random() * 500) + 500;

module.exports = {
  Product: {
    reviews: async (product, _args, context) => {
      await sleep(context.delay == 0 ? rand() : context.delay);
      return getProductReviews(product.id);
    },
    averageRating: (product, _args, context) => {
      return getProductReviewAverage(product.id);
    },
  },
};
