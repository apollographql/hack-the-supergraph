# Solar Seas - Hack the Supergraph

The Solar Seas are beautiful and vast. As you're traveling, you find the Planisphere you started with is getting slow when reading the `CelestialBody` coordinates. It makes traveling to new locations difficult when you're far away in the solar Seas.

You find a galactic map and now you have all the locations across the cosmos. The original Planisphere still provides some information, but this will help speed up getting those locations coordinates. We just need to override the original Planisphere's information for `CelestialBody`.

Try opening up Explorer for your Supergraph and run this query:

```graphql
query AllDestinations {
  destinations {
    celestialBody {
      galaxy
    }
  }
}
```

>*NOTE: Notice that it takes longer than 1s to respond*

## Summary

At this subgraph station, you'll be using the `@override` directive to migrate a field on the `Location` entity defined at the start of the hackathon. In our scenario, the original field is returning slow and we have a new service that we want to use instead. 

If you want to write code, this substation also offers multiple language options to build the subgraph using `rover template`. 
 
## What you'll learn

- How to migrate a field from one subgraph to another using `@overrides`
- If you want to code...
  - Creating a new subgraph using `rover template`

<details>
 <summary><h2>I don't want to write code...</h2></summary>

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

</details>

---

<details>
 <summary><h2>I want to write code...</h2></summary>

This substation has instructions for JavaScript, Rust, or Python to develop the subgraph. Feel free to choose whichever you like.

>*NOTE: This subgraph station is meant to run on port 4003 based on the other subgraphs (start is on 4001, space-beach is on 4002 and cosmic-cove is on 4004)*

</details>