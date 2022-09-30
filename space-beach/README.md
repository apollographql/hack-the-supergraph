# Space Beach - Hack the Supergraph

Welcome to the beach! Beaches in space are a little different than beaches we think of on Earth. It's always fun playing games at the beach, but in space, we need to know how risky some of the activities are.

We have all the time in the cosmos, but we want to start planning activities and where we should go based on what we can do. The beach activity information is needed right away, but the location coordinates can be deferred.

Since we created `Location` as an entity at the start of our journey, we can use `@defer` to ensure our graph router returns the activity information as soon as it has it.

Let's `@defer` the location information:

<details>
 <summary><h2>I don't want to write code...</h2></summary>

You find a signal coming from [https://space-beach-production.up.railway.app/](https://space-beach-production.up.railway.app/) that contains the beach information to add into your Supergraph. There is nothing special about the beach subgraph and it actually doesn't support `@defer` itself, but the Supergraph does!

We can add this into our Supergraph by publishing it using [rover].

First, you'll need to [configure rover] for your Supergraph. Once rover is configured, we can use the `rover subgraph publish` command

```shell
rover subgraph publish {YOUR_SUPERGRAPH_ID}@main \
  --schema "./schema.graphql" \
  --name space-beach \
  --routing-url "https://space-beach-production.up.railway.app/"
```

>*NOTE: make sure to replace {YOUR_SUPERGRAPH_ID} with the id of the Supergraph you created at the start of the hackathon*

We can see our Supergraph deployment in the "Launches" tab:

![](../images/space-beach-launch.png)

Now let's open up Explorer and try deferring the location data:

```graphql
query Beaches {
  beaches {
    name
    activities {
      riskLevel
      description
      place
    }
    location {
      ...LocationFragment @defer
    }
  }
}

fragment LocationFragment on Location {
  name
  celestialBody {
    galaxy
    latitude
    longitude
  }
}
```

(gif of everything working)

The Apollo Router supports `@defer` and it can work for any entity defined in your Supergraph, even if your subgraph doesn't support `@defer`. There isn't any extra code or steps, it just works.

Congratulations, you've completed Space Beach! Head to either *cosmic-cove* or *solar-seas* next.

</details>

---

<details>
 <summary><h2>I want to write code...</h2></summary>

You find an old disc on the beach that ends up containing information about beaches and the activities at them. There are `schema.graphql` and `beaches.js` files in this folder that contain the information we'll need to set up this subgraph.

The new subgraph is already started for you in the `start` folder—it's the same as you would get from `rover template use`. Switch into this directory and run `npm install` to get started.

Now replace the `schema.graphql` file in the subgraph with the one in this folder, and move the `beaches.js` to the `src` folder. You will need to expose the information in `beaches.js` on the context to be used in your resolvers. Open the `src/index.js` and add the beaches in the context function:

```javascript
const { BeachData } = require("./beaches");
...
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({
    beaches: new BeachData(),
  }),
  listen: { port },
});
```

Finally, you need to wire up the resolvers for your schema. There is a root `Query`, so open and modify `src/resolvers/Query.js` to use the `beaches` datasource:

```javascript
module.exports = {
  Query: {
    beaches(parent, args, context) {
      return context.beaches.getBeaches();
    },
  },
};
```

Create a `src/resolvers/Beach.js` for the activities and location:

```javascript
module.exports = {
  Beach: {
    activities(beach, args, context) {
      return context.beaches.getBeachActivities(beach.name);
    },
    location(beach, args, context) {
      return { id: beach.location };
    },
  },
};
```

>*NOTE: Notice that we only need to return the `id` for the `location`. This is because `id` is the defined key fields for the `Location`*

Make sure your `src/resolvers/index.js` is updated to import your newly created `Beach` resolver. You can delete any Mutation or other resolvers from the project, they aren't needed.

Now we can start up our subgraph and add it to our Supergraph stack locally with rover:

```shell
npm start
```

***If you still have your previous `rover dev` session running***: run `rover dev` in a new terminal window to add `space-beach` to your local Supergraph stack.

***If you don't have your previous `rover dev` session running***:

- Run `rover dev --url=https://hack-the-supergraph-start-production.up.railway.app/ --name=start`
- In another terminal window, run `rover dev` and add `space-beach` running locally

Now let's head over to our sandbox (*[http://localhost:3000](http://localhost:3000*) and tryout a query with `@defer`:

```graphql
query Beaches {
  beaches {
    name
    activities {
      riskLevel
      description
      place
    }
    location {
      ...LocationFragment @defer
    }
  }
}

fragment LocationFragment on Location {
  name
  celestialBody {
    galaxy
    latitude
    longitude
  }
}
```

![](../images/sandbox-defer.gif)

The Apollo Router supports `@defer` and it can work for any entity defined in your Supergraph, even if your subgraph doesn't support `@defer`. There isn't any extra code or steps, it just works.

Finally, we can add `space-beach` to our Supergraph by publishing it to our Supergraph using [rover].

First, you'll need to [configure rover] for your Supergraph. Once rover is configured, we can use the `rover subgraph publish` command

```shell
rover subgraph publish {YOUR_SUPERGRAPH_ID}@main \
  --schema "./schema.graphql" \
  --name space-beach \
  --routing-url "https://space-beach-production.up.railway.app/"
```

>*NOTE: make sure to replace {YOUR_SUPERGRAPH_ID} with the id of the Supergraph you created at the start of the hackathon*

![](../images/space-beach-subgraph-publish.png)

We can see our Supergraph deployment in the "Launches" tab:

![](../images/space-beach-launch.png)

Now try opening Explorer and running the same query you ran in your local sandbox. Since `@defer` is supported in the Apollo Router, it works the same whether it's local or in the cloud :magic:
</details>

---

Congratulations, you've completed Space Beach! Head to either *cosmic-cove* or *solar-seas* next.

[rover]: https://www.apollographql.com/docs/rover
[configure rover]: https://www.apollographql.com/docs/rover/configuring