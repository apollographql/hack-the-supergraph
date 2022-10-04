const fetch = require("cross-fetch");
const baseUrl =
  "https://hack-the-supergraph-legacy-api-production.up.railway.app";

class BeachData {
  async getBeaches() {
    const response = await fetch(`${baseUrl}/beaches`);
    return await response.json();
  }
  async getBeach(name) {
    const response = await fetch(`${baseUrl}/beaches/${name}`);
    return await response.json();
  }
  async getBeachActivities(name) {
    const response = await fetch(`${baseUrl}/beaches/${name}/activities`);
    return await response.json();
  }
}
module.exports = { BeachData };
