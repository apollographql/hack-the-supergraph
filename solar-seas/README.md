# Solar Seas - Hack the Supergraph

The Solar Seas are beautiful and vast. As you're traveling, you find the box you started with is getting slow when reading the `CelestialBody` coordinates. It makes traveling to new locations difficult when you're far away in the solar Seas.

You find a galactic map and now you have all the locations across the cosmos. The original box still provides some information, but this will help speed up getting those locations coordinates. We just need to override the original box's information for `CelestialBody`.

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

You'll find a `schema.graphql` in this folder that is a copy of the schema you need from the start; use this file or make your edits.

Remember our schema from the `Location` we defined at the start:

```graphql
type Location @key(fields: "id") {
  id: ID!
  celestialBody: CelestialBody! @shareable # This is what we want to override
}
```

We want to do is override the `celestialBody` of `Location` since we have a faster datasource.

This can be done using `@overrides` directive once we've added it to the imported directives in our schema:

```graphql
extend schema
  @link(
    url: "https://specs.apollo.dev/federation/v2.0"
    import: ["@key", "@shareable", "@override"]
  )
```

Finally, we need to add the `@override` directive to `celestialBody` and declare what subgraph we want to override:

```graphql
type Location @key(fields: "id") {
  id: ID!
  celestialBody: CelestialBody! @shareable @override(from: "start")
}
```

*NOTE: If you named your starting subgraph something other than 'start', change that in your schema.*

We can add `solar-seas` into our Supergraph by publishing it using [rover].

First, you'll need to [Configure rover] for your Supergraph. Once rover is configured, we can use the `rover subgraph publish` command

```shell
rover subgraph publish {YOUR_SUPERGRAPH_ID}@main \
  --schema "./schema.graphql" \
  --name solar-seas \
  --routing-url "https://solar-seas-production.up.railway.app/"
```

We can see our Supergraph deployment in the "Launches" tab:

(image of successful launch - found bug in staging that is blocking this)

Now let's open up Explorer and try running the same query in explorer to see the query execute faster. Congratulations, you've completed Solar Seas! Head to either *cosmic-cove* or *space-beach* next.

---

Congratulations, you've completed Solar Seas! Head to either *cosmic-cove* or *space-beach* next.

</details>

---

<details>
 <summary><h2>I want to write code...</h2></summary>

This substation has instructions for JavaScript, Rust, or Python to develop the subgraph. Feel free to choose whichever you like.

</details>