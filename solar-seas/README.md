# Apollo Server JavaScript Subgraph Template

This template can be used to quickly create an [Apollo Federation] subgraph with the [@apollo/subgraph] and [@apollo/server] packages.

## What's Included

- A basic, [Apollo Federation] subgraph with simple examples for queries, entities, and mutations. You can run this subgraph with `npm start`.
- [nodemon] is 
- Example tests in the `src/__tests__` directory. You can run these tests with `npm run test`.
- GitHub Actions workflows which will:
  - Run `npm run test` on every push.
  - Check the schema against Apollo Studio on every push.
  - Publish the subgraph to Apollo Studio on every push to the `main` branch.

## Setup Wizard

There is a `.template` folder included in this template that provides a "wizard" like setup experience. It currently does the following:

- Runs `npm install` to install packages
- Asks if you would like to mock the schema using [graphql-tools]
  - if yes...
    - Copy `.template/mock.js` to `src/index.js`
    - Run `npm i @graphql-tools/mock`
  - finally...
    - Delete `.template` folder

## Next Steps

- Setup project with `npm install` or run `node .template/setup.js` for a wizard experience
  - You can delete the `.template` folder if you don't want to use it (the wizard also deletes the folder after running)
- Download [Rover] and start it using the command printed out from `cargo run` to start a local version of Apollo Explorer.
- Replace "name" in `package.json` with the name of your subgraph.
- Start filling in your own schema in `schema.graphql`.
- Start filling in your own types and resolvers in `src/resolvers`.
- Set these secrets in GitHub Actions to enable all checks:
  - `APOLLO_KEY`: An Apollo Studio API key for the supergraph to enable schema checks and publishing of the subgraph.
  - `APOLLO_GRAPH_REF`: The name of the supergraph in Apollo Studio.
  - `PRODUCTION_URL`: The URL of the deployed subgraph that the supergraph gateway will route to.
- Write your custom deploy logic in `.github/workflows/deploy.yaml`.

[apollo federation]: https://www.apollographql.com/docs/federation/
[apollo server]: https://www.apollographql.com/docs/apollo-server/
[@apollo/subgraph]: https://www.apollographql.com/docs/federation/subgraphs
[rover]: https://www.apollographql.com/docs/rover/
[nodemon]: https://www.npmjs.com/package/nodemon
[graphql-tools]: https://www.graphql-tools.com/docs/mocking