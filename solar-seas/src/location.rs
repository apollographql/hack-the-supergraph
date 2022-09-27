use crate::celestial_body::CelestialBody;
use async_graphql::{SimpleObject, ID};

#[derive(SimpleObject)]
pub(crate) struct Location {
    pub(crate) id: ID,
    #[graphql(override_from = "start")]
    pub(crate) celestial_body: CelestialBody,
}
