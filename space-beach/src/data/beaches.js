const fetch = require("node-fetch");

class BeachData {
  async getBeaches() {
    const response = await fetch("http://localhost:5000/beaches");
    return await response.json();
  }
  async getBeach(name) {
    const response = await fetch(`http://localhost:5000/beaches/${name}`);
    return await response.json();
  }
  async getBeachActivities(name) {
    const response = await fetch(
      `http://localhost:5000/beaches/${name}/activities`
    );
    return await response.json();
  }
}
module.exports = { BeachData };
