const { Schema, model } = require("mongoose");

const ContractAddressSchema = new Schema(
  {
    address: { type: String, required: true },
    activation: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const ContractAddress = model("ContractAddress", ContractAddressSchema);

module.exports = {ContractAddress};