use async_graphql::{Context, EmptyMutation, EmptySubscription, Object, ID};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::{extract::Extension, routing::post, Router};
use std::collections::HashMap;
use tower_http::compression::CompressionLayer;

use celestial_body::CelestialBody;
use location::Location;

mod celestial_body;
mod location;

struct Query;

#[Object]
impl Query {
    #[graphql(entity)]
    async fn location_by_id(&self, ctx: &Context<'_>, id: ID) -> Option<Location> {
        let locations: &HashMap<ID, CelestialBody> = ctx.data_unchecked();
        locations.get(&id).map(|celestial_body| Location {
            id,
            celestial_body: celestial_body.clone(),
        })
    }
}

type Schema = async_graphql::Schema<Query, EmptyMutation, EmptySubscription>;

async fn graphql_handler(schema: Extension<Schema>, req: GraphQLRequest) -> GraphQLResponse {
    schema.execute(req.into_inner()).await.into()
}

#[must_use]
pub fn app() -> Router {
    let json_data = include_str!("celestialMap.json");
    let celestial_bodies: HashMap<ID, CelestialBody> =
        serde_json::from_str(json_data).expect("Failed to deserialize celestialMap.json");

    let schema: Schema = Schema::build(Query, EmptyMutation, EmptySubscription)
        .enable_federation()
        .limit_complexity(100)
        .data(celestial_bodies)
        .finish();

    Router::new()
        .route("/", post(graphql_handler))
        .layer(Extension(schema))
        .layer(CompressionLayer::new())
}
