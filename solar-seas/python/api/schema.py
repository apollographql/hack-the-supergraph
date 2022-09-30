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
    celestial_body: CelestialBody = strawberry.federation.field(override="start")


@strawberry.type
class Query:
    solar_seas: str


schema = strawberry.federation.Schema(
    Query,
    enable_federation_2=True,
)
