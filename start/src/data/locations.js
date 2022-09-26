const fetch = require("node-fetch");

class LocationsData {
  async getLocations() {
    const response = await fetch("http://localhost:5000/locs");
    return await response.json();
  }
  async getLocation(id) {
    const response = await fetch(`http://localhost:5000/locs/${id}`);
    return await response.json();
  }
  async getLocationCelestialBody(id) {
    const response = await fetch(`http://localhost:5000/locs/${id}/celestial`);
    return await response.json();
  }
}
module.exports = { LocationsData };
