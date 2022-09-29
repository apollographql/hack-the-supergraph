module.exports = {
  Cove: {
    cavernMap(cove, args, context) {
      const { latitude, longitude } = cove.location.celestialBody;
      return context.coves.getCavernMap(latitude, longitude);
    },
    __resolveReference(parent, context) {
      return context.coves.getCove(parent.id);
    },
  },
};
