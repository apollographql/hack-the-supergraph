module.exports = {
  Location: {
    async celestialBody(parent, args, context) {
      const location = await context.locations.getLocationCelestialBody(
        parent.id
      );
      return location.celestialBody;
    },
  },
};
