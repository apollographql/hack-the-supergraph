const coves = [{ id: "1", location: { id: "1" } }];

class CoveData {
  getCoves() {
    return coves;
  }
  getCove(id) {
    return coves.find((c) => c.id == id);
  }
  async getCavernMap(lat, long) {
    const results = await fetch(`map/${lat}/${long}`);
    return results.json();
  }
}

module.exports = { CoveData };
