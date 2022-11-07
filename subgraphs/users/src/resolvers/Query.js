const { getUserById } = require("../data");

module.exports = {
  Query: {
    viewer(_, __, context) {
      const userId = context.headers["x-user-id"];

      if (!userId) {
        return null;
      }

      return getUserById(userId);
    },
  },
};
