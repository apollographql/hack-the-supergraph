const { readFileSync } = require("fs");

const gql = require("graphql-tag");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const resolvers = require("./resolvers");
const { LocationsData } = require("./data/locations");
const port = process.env.PORT ?? 4001;

async function main() {
  const typeDefs = gql(
    readFileSync("schema.graphql", {
      encoding: "utf-8",
    })
  );

  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({
      auth: req.headers.authentication,
      locations: new LocationsData(),
    }),
    listen: { port },
  });
  console.log(`🚀  Subgraph ready at ${url}`);
}

main();
