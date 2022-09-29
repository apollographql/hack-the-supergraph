from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


def test_query_foo():
    response = client.post("/graphql", json={"query": "{ foo(id: 1) { id name } }"})
    assert response.status_code == 200
    assert response.json() == {"data": {"foo": {"id": "1", "name": "Foo"}}}


def test_entities_foo():
    query = """
        query {
            _entities(representations: [{ __typename:"Foo", id:"1" }]) {
                ...on Foo {
                    id
                    name
                }
            }
        }
    """

    response = client.post("/graphql", json={"query": query})
    assert response.status_code == 200
    assert response.json() == {"data": {"_entities": [{"id": "1", "name": "Foo"}]}}
