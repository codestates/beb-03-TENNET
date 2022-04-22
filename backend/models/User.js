const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    address: { type: String, required: true, unique: true },
    nickName: { type: String, required: true, unique: true },
    privateKey: String,
    image: String,
  },
  { timestamps: true }
);

const User = model("user", UserSchema);
module.exports = { User };
