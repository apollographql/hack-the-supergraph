module.exports = {
  Query: {
    async destinations(parent, args, context) {
      return await context.locations.getLocations();
    },
  },
};
