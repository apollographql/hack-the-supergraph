# Solar Seas - Hack the Supergraph (Python)

## Getting started

In this guide we'll be using Python and [Strawberry GraphQL](https://strawberry.rocks). Strawberry is
a code first library and we'll be implementing the schema defined in `./schema.graphql` using Python code.

To start a new subgraph, we'll use `rover template use solar-seas-subgraph --template subgraph-python-strawberry-fastapi` to create a project with the Python template.

After `rover template use` is complete, setup the project:

```shell
cd solar-seas-subgraph
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
```

## Implementing the schema

The schema will be defined in `api/schema.py`, feel free to replace its content with the following:

```Python
from typing import Optional

import strawberry


@strawberry.federation.type(shareable=True)
class CelestialBody:
    galaxy: Optional[str]
    latitude: float
    longitude: float


@strawberry.federation.type(keys=["id"])
class Location:
    id: strawberry.ID
    celestial_body: CelestialBody = strawberry.federation.field(override="start", shareable=True)


@strawberry.type
class Query:
    solar_seas: str


schema = strawberry.federation.Schema(
    Query,
    types=[Location, CelestialBody],
    enable_federation_2=True,
)
```

## Implementing the resolver

Before implementing the resolver we should add our celestial map data to the context, allowing
us to access it in our resolvers. To do this, we'll add a `get_context` function to `api/main.py`:

```python
import json
from pathlib import Path

from fastapi import FastAPI

from strawberry.fastapi import GraphQLRouter

from api.schema import schema


async def get_context():
    here = Path(__file__).parent
    celestial_map = json.loads((here / "celestial_map.json").read_text())

    return {
        "celestial_map": celestial_map,
    }
```

this function will read the `celestial_map.json` file and return it inside the context.

Finally we need to add the `get_context` function to the `GraphQLRouter`:

```python
graphql_app = GraphQLRouter(
    schema,
    path="/",
    context_getter=get_context,
)
```

Now we can implement the resolver for `Location.celestial_body`, back in `api.schema.py` we'll
define a new function called `resolve_celestial_body`:

```python
from strawberry.types.info import Info

def resolve_celestial_body(root: "Location", info: Info) -> CelestialBody:
    celestial_map = info.context["celestial_map"]
    celestial_body = celestial_map[root.id]

    return CelestialBody(
        galaxy=celestial_body["galaxy"],
        latitude=celestial_body["latitude"],
        longitude=celestial_body["longitude"],
    )
```

This function will get the `celestial_map` from the context and use the `location.id` to get the
celestial body information. Finally, we'll return a `CelestialBody` object.

Now we need to add this resolver to `Location.celestial_body`:

```python
@strawberry.federation.type(keys=["id"])
class Location:
    id: strawberry.ID
    celestial_body: CelestialBody = strawberry.federation.field(override="start", resolver=resolve_celestial_body)
```

Finally we need to add the reference resolver to `Location`, this will tell Apollo Federation
how to resolve the `Location` type:

```python
@strawberry.federation.type(keys=["id"])
class Location:
    id: strawberry.ID
    celestial_body: CelestialBody = strawberry.federation.field(
        override="start", resolver=resolve_celestial_body
    )

    @classmethod
    def resolve_reference(cls, **representation) -> "Location":
        return cls(id=representation["id"])
```

Now we can start up our subgraph and add it to our Supergraph stack locally with rover:

```shell
uvicorn main:app --host 0.0.0.0 --port 4001
```

***If you still have your previous `rover dev` session running***: run `rover dev` in a new terminal window to add `solar-seas` to your local Supergraph stack.

***If you don't have your previous `rover dev` session running***:

- Run `rover dev --url=https://hack-the-supergraph-start-production.up.railway.app/ --name=start`
- In another terminal window, run `rover dev` and add `solar-seas` running locally

Now let's head over to our sandbox (*[http://localhost:3000](http://localhost:3000*) and try the same query. It should execute faster and you can view the query plan showing the starting subgraph isn't used in the query plan, the new `solar-seas` subgraph is:

![](../../images/sandbox-query-plan.png)

We can add `solar-seas` into our Supergraph by publishing it using [rover]. Before doing that we need to export our API key:

```shell
strawberry export-schema api.schema > schema.graphql
```

Then, you'll need to [Configure rover] for your Supergraph. Once rover is configured, we can use the `rover subgraph publish` command

```shell
rover subgraph publish {YOUR_SUPERGRAPH_ID}@main \
  --schema "./schema.graphql" \
  --name solar-seas \
  --routing-url "https://solar-seas-production.up.railway.app/"
```

We can see our Supergraph deployment in the "Launches" tab:

(image of successful launch - blocked by bug in staging)

Now let's open up Explorer and try running the same query in explorer to see the query execute faster.

---

Congratulations, you've completed Space Beach! Head to either *cosmic-cove* or *space-beach* next.