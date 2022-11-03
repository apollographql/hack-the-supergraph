const { getReviewById } = require("../data");

module.exports = {
  Review: {
    __resolveReference: (parent, context) => {
      return getReviewById(parent.id);
    }
  },
};
