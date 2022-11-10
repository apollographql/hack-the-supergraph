const orders = [
  {
    id: "order:1",
    buyer: { id: "user:1" },
    items: [{ id: "product:1" }, { id: "product:2" }],
    total: { amount: 100.50, currency: "USD" }
  },
  { id: "order:2", buyer: { id: "user:1" }, items: [{ id: "product:1" }] },
  {
    id: "order:3",
    buyer: { id: "user:2" },
    items: [{ id: "product:1" }, { id: "product:3" }],
  },
  { id: "order:4", buyer: { id: "user:3" }, items: [{ id: "product:1" }] },
  {
    id: "order:5",
    buyer: { id: "user:3" },
    items: [{ id: "product:1" }, { id: "product:2" }],
  },
  {
    id: "order:6",
    buyer: { id: "user:3" },
    items: [{ id: "product:1" }, { id: "product:3" }, { id: "product:4" }],
  },
];

const getOrderById = (id) => orders.find((it) => it.id === id);

module.exports = { getOrderById };
