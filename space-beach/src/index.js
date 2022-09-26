const gql = require("graphql-tag");
const { readFileSync } = require("fs");
const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require("@apollo/server/standalone");

const resolvers = require("./resolvers");
const { BeachData } = require("./data/beaches");
const port = process.env.PORT ?? 4004;
const subgraphName = require("../package.json").name;

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
      beaches: new BeachData(),
    }),
    listen: { port },
  });

  console.log(`🚀  Subgraph ready at ${url}`);
  console.log(
    `Run 'rover dev --url http://localhost:${port} --name ${subgraphName}`
  );
}

main();
