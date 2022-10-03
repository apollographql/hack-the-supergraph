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

## Summary

At this subgraph station, you'll be using the `@override` directive to migrate a field on the `Location` entity defined at the start of the hackathon. In our scenario, the original field is returning slow and we have a new service that we want to use instead. 

If you want to write code, this substation also offers multiple language options to build the subgraph using `rover template`. 
 
## What you'll learn

- How to migrate a field from one subgraph to another using `@overrides`
- If you want to code...
  - Creating a new subgraph using `rover template`

There are multiple paths to complete this challenge, pick one of the following and go to the `README.md` file in that folder:

1. [no-code](./no-code/README.md): Learn concepts without editing any code.
2. [javascript](./javascript/README.md): Build a new subgraph in JavaScript.
3. [rust](./rust/README.md): Build a new subgraph in Rust.
4. [typescript](./typescript/README.md): Build a new subgraph in TypeScript.
5. [python](./python/README.md): Build a new subgraph in Python.