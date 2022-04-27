const { Router } = require("express");
const userRouter = Router();
const mongoose = require("mongoose");
const { isValidObjectId } = require("mongoose");
const { User } = require("../models/user");
require("dotenv").config();

userRouter.get("/:address", async (req, res) => {
  //userCheck&Info
  try {
    const { address } = req.params;
    console.log(address);
    const userAddressCheck = await User.exists({ address: address });
    if (!userAddressCheck == false)
      return res.status(400).send({ err: "가입되어있지않은 주소입니다." });
    const user = await User.findOne({ address: address });
    res.send({ user });
  } catch (err) {
    console.log(err);
  }
});

userRouter.post("/signup", async (req, res) => {
  let { address, nickName, privateKey } = req.body;
  console.log(nickName, privateKey, address);
  if (!address) return res.status(400).send({ err: "address is required!" });
  if (!nickName) return res.status(400).send({ err: "nickName is required!" });
  if (!privateKey)
    return res.status(400).send({ err: "privateKey is required!" });

  try {
    const userAddressCheck = await User.exists({ address: address });
    const nickNameCheck = await User.exists({ nickName: nickName });
    console.log(userAddressCheck);
    console.log(nickNameCheck);
    console.log(!userAddressCheck);
    console.log(!nickNameCheck);

    if (!userAddressCheck == false || !nickNameCheck == false)
      return res
        .status(400)
        .send({ err: "이미 존재하는 주소 혹은 닉네임 입니다." });
    const user = new User({
      address: address.toString(),
      nickName,
      privateKey: privateKey,
    });
    user.save();
    return res.send({ user, message: "OK" });
  } catch (err) {
    console.log({ err });
  }
});

userRouter.put("/mypage/update/:address", async (req, res) => {
  //userInfo update
  const { address } = req.params;
  const { nickName, image } = req.body;

  const nickNameCheck = await User.exists({ nickName: nickName });

  if (!nickNameCheck == false)
    return res
      .status(400)
      .send({ err: "이미 존재하는 주소 혹은 닉네임 입니다." });

  const userData = await User.findOneAndUpdate(
    { address: address },
    { nickName, image },
    { new: true }
  );
  console.log(userData);
  return res.send({ userData });
});

userRouter.get("/post/:nickName", async (req, res) => {
  const { nickName } = req.params;
  try {
    const userNickNameCheck = await User.exists({ nickName: nickName });
    if (!userNickNameCheck == false)
      return res
        .status(400)
        .send({ err: "해당 닉네임으로 게시물이 존재하지않습니다." });

    const posts = await posts.find({ nickName: nickName });
    return res.status(200).send({ posts });
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  userRouter,
};

/* userRouter.post("/login", async (req, res) => {
  try {
    const { address, privateKey } = req.body;
    const userAddressCheck = await User.exists({ address: address });
    if (!userAddressCheck)
      return res.status(400).send({ err: "address is not exists." });
    const user = await User.findOne({
      address: address,
      privateKey: privateKey,
    });
    if (!user) return res.status(400).send({ err: " privateKey is wrong." });
    if (user) return res.status(200).send({ user, msg: "Sucess Login" });
  } catch (err) {
    console.log(err);
  }
}); */
