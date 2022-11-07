const { getUserById } = require("../data");

module.exports = {
  User: {
    __resolveReference(ref) {
      return getUserById(ref.id);
    },
  },
};
