# Hack the Supergraph (No Code)

Our existing schema is like a monolith—it's not designed to be used with Federation. To fix this, we want to make `Location` and [entity] so that other subgraphs can consume and extend it.

Here's the existing schema:

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

To upgrade the `Location` type to be an entity, we'll add the `@key` directive. The `@key` directive tells the supergraph that this is an entity, and which fields are required to identify it within this supgraph. In this case, the `id` field is the only one needed.

```graphql
type Location @key(fields:"id") {
  id: ID!
  name: String
  celestialBody: CelestialBody!
}
```

In order to use that `@key` directive, we import it via `@link`:

```graphql
extend schema
  @link(
    url: "https://specs.apollo.dev/federation/v2.0"
    import: ["@key", "@shareable"]
  )
```

> **Note: we also imported the `@shareable` directive, we'll be using it in the next step.**

`CelestialBody` contains the coordinates of a specific location, and we'll need to use that type in other places in our Supergraph. For shared types, we can denote this with the `@shareable` directive on the `CelestialBody` type. We'll also add `@shareable` to `Location.celestialBody`:

```graphql
type Location @key(fields:"id") {
  id: ID!
  name: String
  celestialBody: CelestialBody! @shareable
}

type CelestialBody @shareable {
  galaxy: String
  latitude: Float
  longitude: Float
}
```

That's it! Now we've upgraded our schema to expose `Location` as an entity 🎉. The final schema is provided in the `schema.graphql` file in this directory.

Now head over to [studio.apollographql.com](https://studio.apollographql.com) and let's create our Supergraph. We can get data from the box at [https://hack-the-supergraph-start-production.up.railway.app/](https://hack-the-supergraph-start-production.up.railway.app/) . Add this as your first subgraph and paste in the schema that we modified above. **Name the subgraph `start`**.

![Create your supergraph](../../images/create-supergraph.png)

![Name your supergraph](../../images/name-new-supergraph.png)

>*We recommend giving this Supergraph an ID of **hack-the-supergraph-{surname}** to ensure you have a unique id. Make sure to copy the id of your Supergraph, we'll use it in other subgraph stations*

We can use the default `main` variant for this hackathon:

![](../../images/supergraph-variant.png)

Congrats, you just started your Supergraph! Now navigate to explorer and query all the available locations:

```graphql
query AllLocations {
  destinations {
    name
    celestialBody {
      galaxy
      latitude
      longitude
    }
  }
}
```

![](../../images/start-explorer-query.png)

---

Congratulations, you've completed the starting point of the hackathon! Head to any of the subgraph stations (*cosmic-cove*, *solar-seas* or *space-beach*) next.

[entity]: https://www.apollographql.com/docs/federation/entities
[Apollo Federation directives]: https://www.apollographql.com/docs/federation/federated-types/federated-directives
[rover]: https://www.apollographql.com/docs/rover/
