# Strawberry GraphQL Subgraph Template

This template can be used to quickly create an [Apollo Federation] subgraph with
[Strawberry GraphQL].

## Getting started

To get started, install [rover] and then run the following commands:

```shell
rover template use -t subgraph-python-strawberry-fastapi
```

## What's included

- A basic, [Apollo Federation] subgraph with simple examples for queries,
  entities, and mutations.
- Example tests in the `tests` directory.
- GitHub Actions workflows which will:
  - Run `pytest` on every push.
  - Check the schema against Apollo Studio on every push.
  - Publish the subgraph to Apollo Studio on every push to the `main` branch.

## Next Steps

You can now run the following commands to get started:

```bash
python -m venv .virtualenv
source .virtualenv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
```

## Running the server

To run the server, run:

```bash
uvicorn app.main:app --reload
```

## Apollo Studio Configuration

The GitHub actions for this template are configured to publish the subgraph to
Apollo Studio. But they are disabled by default. To enable them, you'll need to
add the following secrets to your repository:

- `APOLLO_KEY`: An Apollo Studio API key for the supergraph to enable schema
  checks and publishing of the subgraph.
- `APOLLO_GRAPH_REF`: The name of the graph in Apollo Studio to publish the
  subgraph to. This should be in the format `graph-name@variant-name`.
- `PRODUCTION_URL`: The URL of the deployed subgraph that the supergraph gateway
  will route to.
- `SUBGRAPH_NAME`: The name of the subgraph in Apollo Studio.

And remove the `if: false` from the `publish` step in the `publish-schema.yml`
and `check-schema.yml` workflows.

[apollo federation]: https://www.apollographql.com/docs/federation/
[strawberry graphql]: https://strawberry.rocks/
[rover]: https://www.apollographql.com/docs/rover/getting-started
