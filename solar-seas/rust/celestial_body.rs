use async_graphql::SimpleObject;

use serde::Deserialize;

#[derive(Clone, Debug, Deserialize, SimpleObject)]
#[graphql(shareable)]
pub(crate) struct CelestialBody {
    galaxy: String,
    latitude: f64,
    longitude: f64,
}
