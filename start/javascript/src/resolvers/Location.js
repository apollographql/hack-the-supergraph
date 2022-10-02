function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
module.exports = {
  Location: {
    __resolveReference(parent, context) {
      return context.locations.getLocation(parent.id);
    },
    async name(location) {
      await sleep(1000);
      return location.name;
    },
    async celestialBody(parent, args, context) {
      await sleep(1000);
      const location = await context.locations.getLocationCelestialBody(
        parent.id
      );
      return location.celestialBody;
    },
  },
};
