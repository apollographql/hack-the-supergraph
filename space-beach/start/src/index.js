const gql = require("graphql-tag");
const { readFileSync } = require("fs");
const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require("@apollo/server/standalone");

const resolvers = require("./resolvers");
const port = process.env.PORT ?? 4001;
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
      // Add what you need at context creation
      //  to be available in resovlers (i.e. context.foos)
      //
      // auth: req.headers.authentication,
      // foos: new FooDataSource(),
    }),
    listen: { port },
  });

  console.log(`🚀  Subgraph ready at ${url}`);
  console.log(
    `Run 'rover dev --url http://localhost:${port} --name ${subgraphName}`
  );
}

main();
