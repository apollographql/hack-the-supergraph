module.exports = {
  Query: {
    coves(parent, args, context) {
      return context.coves.getCoves();
    },
  },
};
