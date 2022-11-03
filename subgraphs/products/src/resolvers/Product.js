function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const { getProductById } = require("../data");

module.exports = {
  Product: {
    __resolveReference(ref) {
      return getProductById(ref.id);
    },
  },
};
