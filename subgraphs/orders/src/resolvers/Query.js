const { getOrderById } = require("../data");

module.exports = {
  Query: {
    order(_, { id }) {
      return getOrderById(id);
    },
  },
};
