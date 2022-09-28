module.exports = {
  Mutation: {
    createThing(parent, { thing }, context) {
      // Access datasources on the context
      //
      // return context.things.createThing(thing);
      return { ...thing };
    },
  },
};
