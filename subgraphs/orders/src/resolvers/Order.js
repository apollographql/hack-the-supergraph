const { getOrderById } = require("../data");

module.exports = {
  Order: {
    __resolveReference(ref) {
      return getOrderById(ref.id);
    },
  },
};
