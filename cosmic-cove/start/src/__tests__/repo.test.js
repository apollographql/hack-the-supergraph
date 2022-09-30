const { buildSubgraphSchema } = require("@apollo/subgraph");
const { ApolloServer } = require("@apollo/server");
const { readFileSync } = require("fs");
const gql = require("graphql-tag");
const resolvers = require("../resolvers");

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs: gql(
      readFileSync("schema.graphql", {
        encoding: "utf-8",
      })
    ),
    resolvers,
  }),
});

describe("Repository Template Functionality", () => {
  it("Execute root query", async () => {
    //Arrange
    const query =
      'query { _entities(representations:[{__typename:"Thing",id:"1"}]) { ...on Thing { name } } }';
    const expected = { _entities: [{ name: "Name" }] };
 
    //Act
    const response = await server.executeOperation({ query });

    //Assert
    expect(response.result.data).toEqual(expected);
  });
});
