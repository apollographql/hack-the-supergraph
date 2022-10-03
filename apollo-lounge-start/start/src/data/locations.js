const fetch = require("node-fetch");
const baseUrl =
  "https://hack-the-supergraph-legacy-api-production.up.railway.app";

class LocationsData {
  async getLocations() {
    const response = await fetch(`${baseUrl}/locs`);
    return await response.json();
  }
  async getLocation(id) {
    const response = await fetch(`${baseUrl}/locs/${id}`);
    return await response.json();
  }
  async getLocationCelestialBody(id) {
    const response = await fetch(`${baseUrl}/locs/${id}/celestial`);
    return await response.json();
  }
}
module.exports = { LocationsData };
