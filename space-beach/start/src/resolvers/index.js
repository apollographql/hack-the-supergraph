const { Query } = require("./Query");
const { Mutation } = require("./Mutation");
const { Thing } = require("./Thing");
const resolvers = {
  Query,
  Mutation,
  Thing,
};

module.exports = resolvers;
