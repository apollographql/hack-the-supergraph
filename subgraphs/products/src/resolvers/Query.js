const { getProductById, PRODUCTS } = require("../data");

module.exports = {
  Query: {
    product: (_, { id }) => getProductById(id),
    products: (_, _args) => PRODUCTS,
    searchProducts(_, { searchInput }) {
      if (searchInput?.titleStartsWith) {
        return PRODUCTS.filter((p) =>
          p.title.startsWith(searchInput.titleStartsWith)
        );
      }

      return PRODUCTS;
    },
  },
};
