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
    const query = `query ($representations: [_Any!]!) {
      _entities(representations: $representations) {
        ...on Thing {
          name
        }
      }
    }`;
    const variables = {
      representations: [{ __typename: "Thing", id: "1" }],
    };
    const expected = { _entities: [{ name: "Name" }] };

    //Act
    const response = await server.executeOperation({ query, variables });

    //Assert
    // expect(response.result.data).toEqual(expected);
    expect(response.body.kind).toEqual("single");
    expect(response.body.singleResult.data).toEqual(expected);
  });
});
