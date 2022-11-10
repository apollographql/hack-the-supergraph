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
      'query { _entities(representations:[{__typename:"Order",id:"order:1"}]) { ...on Order { id } } }';
    const expected = { _entities: [{ id: "order:1" }] };
 
    //Act
    const response = await server.executeOperation({ query });

    //Assert
    expect(response.body.singleResult.data).toEqual(expected);
  });
});
