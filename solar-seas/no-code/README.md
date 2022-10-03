# Solar Seas - Hack the Supergraph (No Code)

For this station, the schema for coves has already been put together for you:

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
  longitude: Float!
}
```

In this subgraph, we're overriding the `Location.celestialBody` from the `start` subgraph. To do this, we're importing the `@override` Apollo Federation Directive:

```graphql
extend schema
  @link(
    url: "https://specs.apollo.dev/federation/v2.0"
    import: ["@key", "@shareable", "@override"]
  )
```

With `@override` imported, we can use it on the `celestialBody` fied:

```graphql
type Location @key(fields: "id") {
  id: ID!
  celestialBody: CelestialBody! @override(from: "start")
}
```

>*NOTE: If you named your starting subgraph something other than 'start', change that in the `schema.graphql` file.*
>*i.e. `celestialBody: CelestialBody! @override(from: "starting-subgraph-name")`*

We can add `solar-seas` into our Supergraph by publishing it using [rover].

First, you'll need to [Configure rover] for your Supergraph. Once rover is configured, we can use the `rover subgraph publish` command

```shell
rover subgraph publish {YOUR_SUPERGRAPH_ID}@main \
  --schema "./schema.graphql" \
  --name solar-seas \
  --routing-url "https://solar-seas-production.up.railway.app/"
```

We can see our Supergraph deployment in the "Launches" tab. Now let's open up Explorer and try running the same query in explorer to see the query execute faster. 

```graphql
query AllDestinations {
  destinations {
    celestialBody {
      galaxy
    }
  }
}
```

---

Congratulations, you've completed Solar Seas! Head to either *cosmic-cove* or *space-beach* next.
