module.exports = {
  Query: {
    beaches(parent, args, context) {
      return context.beaches.getBeaches();
    },
  },
};
