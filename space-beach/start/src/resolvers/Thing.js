module.exports = {
  Thing: {
    __resolveReference(parent, context) {
      // Access datasources on the context
      //
      // return context.things.getThing(parent.id)
      return { id: parent.id, name: parent.name ?? "Name" };
    },
  },
};
