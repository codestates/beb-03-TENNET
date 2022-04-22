const { Router } = require("express");
const userRouter = Router();
const mongoose = require("mongoose");
const { isValidObjectId } = require("mongoose");
const { User, Post } = require("../models");

require("dotenv").config();

userRouter.post("/login", async (req, res) => {
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

    if (!userAddressCheck || !nickNameCheck)
      return res
        .status(400)
        .send({ err: "이미 존재하는 주소 혹은 닉네임 입니다." });
    function signUp(result, err) {
      const user = new User({
        address: address.toString(),
        nickName,
        privateKey: privateKey,
      });
      user.save();
      return res.send({ user, message: "OK" });
    }
  } catch (err) {
    console.log({ err });
  }
});

userRouter.get("/:userId/post", async (req, res) => {
  const { userId } = req.params;
  try {
    if (!isValidObjectId(userId))
      return res.status(400).send({ err: "invalid userId" });
    const posts = await Post.find({ userId: userId });
    return res.status(200).send({ posts });
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  userRouter,
};
