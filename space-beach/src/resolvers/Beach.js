module.exports = {
  Beach: {
    activities(beach, args, context) {
      return context.beaches.getBeachActivities(beach.name);
    },
    location(beach, args, context) {
      return { id: beach.location };
    },
  },
};
