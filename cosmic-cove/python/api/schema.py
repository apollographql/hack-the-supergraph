import httpx
from typing import List, Optional

import strawberry


@strawberry.federation.type(shareable=True)
class CelestialBody:
    latitude: float
    longitude: float


@strawberry.federation.type(keys=["id"])
class Location:
    id: strawberry.ID
    celestial_body: CelestialBody = strawberry.federation.field(
        external=True, default=None
    )


@strawberry.federation.type(keys=["id"])
class Cove:
    id: strawberry.ID
    location: Location

    @strawberry.federation.field(
        requires=["location { celestialBody { latitude longitude } }"],
    )
    async def cavern_map(
        self,
    ) -> List[float]:
        async with httpx.AsyncClient() as client:
            lat = self.location.celestial_body.latitude
            long = self.location.celestial_body.longitude

            response = await client.get(
                f"https://hack-the-supergraph-legacy-api-production.up.railway.app/map/{lat}/{long}",
                params={
                    "latitude": self.location.celestial_body.latitude,
                    "longitude": self.location.celestial_body.longitude,
                },
            )

            print(response.content)

        return []

    @classmethod
    def resolve_reference(cls, info, **kwargs):
        assert "location" in kwargs

        location = Location(
            # TODO: shouldn't the id come from the reference?
            id=kwargs["location"].get("id", "1"),
            celestial_body=CelestialBody(
                latitude=kwargs["location"]["celestialBody"]["latitude"],
                longitude=kwargs["location"]["celestialBody"]["longitude"],
            ),
        )

        return Cove(
            id=kwargs["id"],
            location=location,
        )

        # {'location': {'celestialBody': {'latitude': 12.653468, 'longitude': 12.44648}}, 'id': '1'}


# AttributeError: type object 'Cove' has no attribute 'resolve_reference'
@strawberry.type
class Query:
    @strawberry.field
    def coves(self) -> List[Cove]:
        return [
            Cove(
                id=strawberry.ID("1"),
                location=Location(
                    id=strawberry.ID("1"),
                ),
            )
        ]


schema = strawberry.federation.Schema(
    Query,
    enable_federation_2=True,
)
