const mongoose = require("mongoose");
const { Schema } = mongoose;

const InventarioSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true}
});

module.exports = mongoose.model("Inventario", InventarioSchema);
