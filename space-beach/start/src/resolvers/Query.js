module.exports = {
  Query: {
    thing(parent, { id }, context) {
      // Access datasources on the context
      //
      // return context.things.getThing(id)
      return { id, name: "Name" };
    },
  },
};
