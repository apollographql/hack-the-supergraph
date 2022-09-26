# Solar Seas - Hack the Supergraph

The solar seas are beaiful and vast. As you're traveling, you find the monolith is getting slow when reading the `CelestialBody` coordinates. It makes traveling to new locations difficult when you're far away in the solar seas.

You find a ______something______ and now you have a map of all the galaxies locations. The monolith still provides some information, but this will help speed up getting those locations. We just need to `@override` the monoliths information for `CelestialBody`

1. Open up Explorer for your Supergraph and run this query:

```graphql
query AllDestinations {
  destinations {
    celestialBody {
      galaxy
    }
  }
}
```

*Note: Notice that it takes longer than 1s to respond*

## LEVEL I

1. Start with the basic schema, what we want to do is override the `celestialBody` of `Location` since we have a faster datasource

```graphql
type Location @key(fields: "id") {
  id: ID!
  # This is what we want to override
  celestialBody: CelestialBody! 

```

2. We need to define that schema

```graphql
extend schema
  @link(
    url: "https://specs.apollo.dev/federation/v2.0"
    import: ["@key", "@shareable", "@override"]
  )

type Location @key(fields: "id") {
  id: ID!
  celestialBody: CelestialBody! @override(from: "start")
}

type CelestialBody @shareable {
  galaxy: String
  latitude: Float!
  longitude: Float!∂
}
```

3. Add `solar-seas` to your Supergraph

*Subgraph URL: https://solar-seas-production.up.railway.app/*

4. Re-run the same query in explorer and see the query execute faster

## LEVEL 2

1. Give the "slow field from old datasource" story
2. Navigate to the "solar-seas" folder wherever you cloned the hackathon materials
3. `rover template use` - Start a new project
4. Setup project - `npm install`
5. Copy schema into the new project along with `celestialMap.js`
6. Introduce `@overrides` into schema
7. Write resolvers that use `celestialMap.js` data
8. Run locally and query through sandbox using `rover dev` - see the query execute faster
9. Add `solar-seas` to your Supergraph

*Subgraph URL: https://solar-seas-production.up.railway.app/*

10. Re-run the same query in explorer and see the query execute faster
