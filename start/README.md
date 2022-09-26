# Hack the Supergrpah

You're lost in space.... (copy from gdoc)

## Start

You find a monolith, it's been used a lot and for a good reason. It has all of the locations for us to visit in the galaxy!

1. Create your Supergraph account at studio.apollographql.com
2. Clone the Hackathon repo
3. Add the monolith to create your Supergraph
   - Use https://hack-the-supergraph-start-production.up.railway.app/ for the Subgraph URL
   - Introspection doesn't work on the monolith, you'll have to find the schema and define Entities
4. Upgrade the monolith:

**LEVEL I**

Starting with this schema

```graphql
type Location  {
  id: ID!
  name: String
  celestialBody: CelestialBody!
}

type CelestialBody {
  galaxy: String
  latitude: Float
  longitude: Float
}

type Query {
  destinations: [Location]
}

```
 1. Add federation directives and discuss them

```graphql
extend schema
  @link(
    url: "https://specs.apollo.dev/federation/v2.0"
    import: ["@key", "@shareable"]
  )
```

  2. Make `Location` an Entity with `@key`
  3. Make `CelestialBody` a shared type with `@shareable`

5. Upload the updated schema 

**LEVEL II**

You will ugrade the monolith server to support Apollo Federation 2

1. Navigate to the "start" folder wherever you cloned the hackathon materials
2. Setup the project - `npm install`
3. Install Apollo Federation specific library - `npm i @apollo/subgraph`
4. Build the schema in `index.js` with `buildSubgraphSchema`
5. Make upgrades to schema (same as Level I)
6. Add `__resolveReference` for `Location` resolver
7. Run locally and query through `rover dev`
8. Upload the updated schema to supergraph
