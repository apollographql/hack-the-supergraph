# Hack the Supergraph - Example Fullstack Supergraph

This repository contains an example of a fullstack supergraph with GraphOS. 

## Subgraphs

All of the subgraph projects are located in the `subgraphs` folder. There are currently five subgraphs: *orders*, *products*, *reviews*, *shipping*, *users*. Each subgraph is currently built with [`@apollo/server`](https://www.apollographql.com/docs/apollo-server) and hosted on [Railway](https://railway.app/)

## Schema Checks

Certain changes to your graph's schema (such as removing a field or type) might break one of your application's clients. GraphOS provides [schema checks](https://www.apollographql.com/docs/graphos/schema-checks) to help you identify breaking changes before you make them, and to help you identify when a potentially dangerous change won't break anything.

To try out schema checks on this repository:

1. Create a new branch for your changes.
2. [Navigate to the products subgraph](subgraphs/products/schema.graphql)
3. Edit the file and remove the `mediaUrl` filed from the `Product` type
4. Commit the changes and submit a PR.

## Deploying Subgraph changes with Launches

In GraphOS, a launch represents the complete process of making a set of updates to a supergraph, usually initiated by changes to one of its subgraphs. 

For this example we've kept it simple and have the minimum of what you want, keeping the `main` branch of this repository in sync with the `main` variant in GraphOS. Each variant of a supergraph has its own subgraph schemas, supergraph schema, change history, and metrics. You might have a staging or pre-production environment and that's exactly what variants are for!

### Set up Rover authentication

Run this command and follow the steps there.
`rover config auth`

### Running checks manually

**Format**
`rover subgraph check <graphID@variant> --name <subgraphName> --schema schema.graphql`

**Example**
`rover subgraph check super-graphics-sn2w57@main --name products --schema schema.graphql`


### Running a publish manually

**Format**
`rover subgraph publish <graphID@variant> --schema schema.graphql --name <subgraphName> --routing-url https://main--hack-the-e-commerce.apollographos.net/graphql`

**Example**
`rover subgraph publish super-graphics-sn2w57@main --schema schema.graphql --name shipping --routing-url https://main--hack-the-e-commerce.apollographos.net/graphql`
