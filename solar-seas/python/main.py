from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter

from api.schema import schema

graphql_app = GraphQLRouter(schema, path="/")

app = FastAPI()
app.include_router(graphql_app)
