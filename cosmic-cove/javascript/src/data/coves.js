const fetch = require("cross-fetch");

class CoveData {
  async getCoves() {
    const results = await fetch(
      `https://hack-the-supergraph-legacy-api-production.up.railway.app/coves/`
    );
    return await results.json();
  }
  async getCove(id) {
    const results = await fetch(
      `https://hack-the-supergraph-legacy-api-production.up.railway.app/coves/${id}`
    );
    return await results.json();
  }
  async getCavernMap(lat, long) {
    const results = await fetch(
      `https://hack-the-supergraph-legacy-api-production.up.railway.app/maps/${lat}/${long}`
    );
    return await results.json();
  }
}

module.exports = { CoveData };
