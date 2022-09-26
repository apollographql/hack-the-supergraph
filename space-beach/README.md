# Space Beach - Hack the Supergraph

Welcome to the beach! 

We have all the time in the galaxy, but we want to start planning beach activities. 

Don't need the location while we're planning the activities, let's `@defer` that

## LEVEL I

1. Give `@defer` discussion story, monoliths entities can be defered through cloud router
2. Add `beaches` subgraph to your Supergraph

*Subgraph URL: https://space-beach-production.up.railway.app/*

3. Open Explorer and run the following query to see `@defer` run live:

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

## LEVEL II

1. Give `@defer` discussion story, monoliths entities can be defered through cloud router
2. Navigate to the "space-beach" folder wherever you cloned the hackathon materials
3. `rover template use` - Start a new project
4. Setup project - `npm install`
5. Copy schema into the new project along with `beaches.js`
6. Create resolvers that use `beaches.js`
7. Run locally and query through sandbox using `rover dev`

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

8. Upload the updated schema to supergraph, run query in explorer
