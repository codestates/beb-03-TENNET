const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    nickName: { type: String, required: true }, // 유니크 속성 안주고 저장할때 중복여부 확인할것임
    address: { type: String, required: true, unique: true },
    image: { type: String },
    // privateKey: { type: String },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

module.exports = {User};
