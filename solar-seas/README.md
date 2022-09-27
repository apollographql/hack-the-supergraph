# Solar Seas - Hack the Supergraph

The solar seas are beautiful and vast. As you're traveling, you find the box you started with is getting slow when reading the `CelestialBody` coordinates. It makes traveling to new locations difficult when you're far away in the solar seas.

You find a galactic map, and now you have all the locations across the cosmos. The original box still provides some information, but now you can speed up those locations coordinates. We just need to [`@override`] the original box's information for `CelestialBody`.

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

*Note: Notice that it takes longer than 1s to respond*

## I don't want to write code...

You'll find a `schema.graphql` in this folder that is a copy of the schema you need from the start; use this file or make your edits.

Remember our schema from the `Location` we defined at the start:

```graphql
type Location @key(fields: "id") {
  id: ID!
  celestialBody: CelestialBody! # This is what we want to override
}
```

We want to override the `celestialBody` of `Location` since we have a faster datasource. 

This can be done using [`@override` directive][`@override`], but first we need to add it to the imported directives in our schema:

```graphql
extend schema
  @link(
    url: "https://specs.apollo.dev/federation/v2.0"
    import: ["@key", "@shareable", "@override"]
  )
```

Now, we can add the `@override` directive to `celestialBody` and declare which subgraph we want to override:

```graphql
type Location @key(fields: "id") {
  id: ID!
  celestialBody: CelestialBody! @override(from: "start")
}
```

*NOTE: If you named your starting subgraph something other than 'start', change that in your schema.*

We can add `solar-seas` into our Supergraph by publishing it using [rover]. 

First, you'll need to [configure rover] for your Supergraph. Once rover is configured, we can use the `rover subgraph publish` command

```shell
rover subgraph publish {YOUR_SUPERGRAPH_ID} \
  --schema "./schema.graphql" \
  --name solar-seas \
  --routing-url "https://solar-seas-production.up.railway.app/"
```

We can see our Supergraph deployment in the "Launches" tab:

(image of successful launch)

Now let's open up Explorer and try running the same query in explorer to see the query execute faster. Congratulations, you've completed Solar Seas! Head to either *cosmic-cove* or *space-beach* next.

## I want to write code...

> To follow this tutorial as-is, you need to [install Rust](https://rustup.rs).

### Getting started

Let's rewrite the slow field in Rust—we can get started quickly with `rover template use solar-seas-subgraph --template subgraph-rust-async-graphql`. Here, "solar-seas-subgraph" is the name of the directory to create, you can name it whatever you want. If you want to complete this section with a different language, run `rover template list` to see the other available templates.

![Image showing invocation of rover template use](template_use.svg)

### Adding the data source

Copy the `celestialMap.json` and `celestial_body.rs` files in this folder into the `src` folder in the new directory—this is going to be our data source. You will need to expose the information in `celestialMap.json` on the context to be used in your resolvers. Open `src/lib.rs` add the `celestial_body` module then import the `CelestialBody` type:

```rust
mod celestial_body;
use celestial_body::CelestialBody;
```

In the `app` function at the bottom of `lib.rs`, we're going to include the JSON data at build time with `include_str!`, then parse it using `serde_json`, and finally add it to the context so our resolvers can access it:

```rust
#[must_use]
pub fn app() -> Router {
    let json_data = include_str!("celestialMap.json");
    let celestial_bodies: HashMap<ID, CelestialBody> = serde_json::from_str(json_data).expect("Failed to deserialize celestialMap.json");

    let schema: Schema = Schema::build(Query, Mutation, EmptySubscription)
        .enable_federation()
        .limit_complexity(100)
        .data(celestial_bodies)
        .finish();

    Router::new()
        .route("/", post(graphql_handler))
        .layer(Extension(schema))
        .layer(CompressionLayer::new())
}
```

> That `HashMap` type should be imported at the top of the file like `use std::collections::HashMap;`. Your IDE might do this for you.

To do this, we're using the `serde_json` crate. The `CelestialBody` type also needs the `serde` crate. We'll add these both to the `Cargo.toml` file in the `dependencies` section:

```toml
[dependencies]
# Existing dependencies...
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

### Overriding `celestialBody`

Next, we need to `@override` the `celestialBody` field in the `Location` type. Create a new `location.rs` file in the `src` directory and add the following:

```rust
use async_graphql::{SimpleObject, ID};
use crate::celestial_body::CelestialBody;

#[derive(SimpleObject)]
pub(crate) struct Location {
    pub(crate) id: ID,
    #[graphql(override_from = "start")]
    pub(crate) celestial_body: CelestialBody,
}
```

> Note that Rust identifiers use snake_case, these will automatically be converted to the GraphQL convention of snakeCase. Also, if you named your subgraph something other than "start", you'll need to change that here.

### Create the `Location` entity

Finally, it's time to declare our new `Location` type as a resolvable entity. In `src/lib.rs` we can declare the module and import the `Location` type, just like we did for `CelestialBody`:

```rust
mod location;
use location::Location;
```

In the `Query` type, let's delete the boilerplate added for `Thing` and create a new entity resolver for `Location`:

```rust
#[Object]
impl Query {
    #[graphql(entity)]
    async fn location_by_id(&self, ctx: &Context<'_>, id: ID) -> Option<Location> {
        let locations: &HashMap<ID, CelestialBody> = ctx.data_unchecked();
        locations.get(&id).map(|celestial_body| Location {
            id,
            celestial_body: celestial_body.clone(),
        })
    }
}
```

> The `Context` type should be added to the `use async_graphql::{}` block at the top of the file.

### Cleanup

We're not creating any mutations, so we can go ahead and delete this boilerplate that was generated:

```rust
struct Mutation;

#[Object]
impl Mutation {
    // TODO: Fill in mutation resolvers
    async fn create_thing(&self, thing: CreateThing) -> Thing {
        let CreateThing { id, name } = thing;
        Thing { id, name }
    }
}
```

Then, replace `Mutation` with `EmptyMutation` wherever it appears, and add that `EmptyMutation` to the existing `use async_graphql::` statement.

`thing.rs` can also be deleted, along with any `mod` or `use` statements referencing it can be removed.

### Run the subgraph

Now we can start up our subgraph and add it to our Supergraph stack locally with rover:

```shell
cargo run
```

> If something else is already running on port 4001, you can change the port using `PORT=<new_port> cargo run`

> ***If you don't have your previous `rover dev` session running***: 
> 
> In a new terminal, run `rover dev --url=https://hack-the-supergraph-start-production.up.railway.app/ --name=start` 

In a new terminal, run `rover dev --url http://localhost:4001 --name solar-seas`.

Now let's head over to our sandbox (*http://localhost:3000*) and try the same query. It should execute much faster, and you can view the query plan showing the new `solar-seas` is used:

(img of query plan in sandbox)

We can add `solar-seas` into our Supergraph by publishing it using [rover]. 

First, you'll need to [Configure rover] for your Supergraph. Once rover is configured, we can use the `rover subgraph publish` command. However, we need to get the schema first—the easiest way is to use `rover subgraph introspect` and pipe the result through:

```shell
rover subgraph introspect http://localhost:4001 | \
rover subgraph publish {YOUR_SUPERGRAPH_ID} \
  --schema - \
  --name solar-seas \
  --routing-url "https://solar-seas-production.up.railway.app/"
```

We can see our Supergraph deployment in the "Launches" tab:

(image of successful launch)

Now let's open up Explorer and try running the same query in explorer to see the query execute faster. Congratulations, you've completed Solar Seas! Head to either *cosmic-cove* or *space-beach* next.

[`@override`]: https://www.apollographql.com/docs/federation/federated-types/federated-directives#override
[rover]: https://www.apollographql.com/docs/rover/
[configure rover]: https://www.apollographql.com/docs/rover/configuring
