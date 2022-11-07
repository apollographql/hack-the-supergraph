const getCostToShipToAddress = (weight, address) => {
  return weight * address.length;
};

module.exports = {
  Order: {
    // Simulate calculating costs with some added randomness
    shippingCost: (parent) => {
      const variantCost = parent.items.map((it) =>
        getCostToShipToAddress(it.weight, parent.buyer.shippingAddress)
      );
      const totalCost = variantCost.reduce((prev, cur) => prev + cur, 0);
      return totalCost + Math.floor(Math.random() * 10);
    },
  },
};
