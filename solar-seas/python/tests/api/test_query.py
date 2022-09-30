from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


def test_query_thing():
    response = client.post("/", json={"query": "{ thing(id: 1) { id name } }"})
    assert response.status_code == 200
    assert response.json() == {"data": {"thing": {"id": "1", "name": "Thing"}}}


def test_entities_thing():
    query = """
        query {
            _entities(representations: [{ __typename: "Thing", id: "1" }]) {
                ...on Thing {
                    id
                    name
                }
            }
        }
    """

    response = client.post("/", json={"query": query})
    assert response.status_code == 200
    assert response.json() == {"data": {"_entities": [{"id": "1", "name": "Thing"}]}}
