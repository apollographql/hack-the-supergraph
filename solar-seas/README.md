# Solar Seas - Hack the Supergraph

The Solar Seas are beautiful and vast. As you're traveling, you find the box you started with is getting slow when reading the `CelestialBody` coordinates. It makes traveling to new locations difficult when you're far away in the solar Seas.

You find a galactic map and now you have all the locations across the cosmos. The original box still provides some information, but this will help speed up getting those locations coordinates. We just need to `@override` the original box's information for `CelestialBody`.

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

There are multiple paths to complete this challenge, pick one of the following and go to the `README.md` file in that folder:

1. [no-code](./no-code/README.md): Learn concepts without editing any code.
2. [javascript](./javascript/README.md): Build a new subgraph in JavaScript.
3. [rust](./rust/README.md): Build a new subgraph in Rust.
4. [typescript](./typescript/README.md): Build a new subgraph in TypeScript.
5. [python](./python/README.md): Build a new subgraph in Python.
