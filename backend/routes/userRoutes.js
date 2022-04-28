const { Router } = require("express");
const userRouter = Router();
const mongoose = require("mongoose");
const { isValidObjectId } = require("mongoose");
const { User, Post, Comment } = require("../models");
require("dotenv").config();

userRouter.get("/:address", async (req, res) => {
  //userCheck&Info
  try {
    const { address } = req.params;
    const userAddressCheck = await User.exists({ address: address });
    if (!userAddressCheck)
      return res.status(400).send({ err: "가입되어있지않은 주소입니다." });
    const user = await User.findOne({ address: address });
    res.send({ data:user, message: "success" });
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.post("/signup", async (req, res) => {
  let { address, nickName, image, /*privateKey*/ } = req.body;
  if (!address) return res.status(400).send({ err: "address is required!" });
  if (!nickName) return res.status(400).send({ err: "nickName is required!" });
  // if (!privateKey)
    // return res.status(400).send({ err: "privateKey is required!" });

  try {
    const userAddressCheck = await User.exists({ address: address });
    const nickNameCheck = await User.exists({ nickName: nickName });

    if (!userAddressCheck == false)
      return res
        .status(400)
        .send({ err: "이미 존재하는 주소 입니다." });
    if (!nickNameCheck == false)
      return res
        .status(400)
        .send({ err: "이미 존재하는 닉네임 입니다." });
    const user = new User({
      address: address.toString(),
      nickName,
      image
      // privateKey: privateKey,
    });
    user.save();
    return res.send({ data: user, message: "OK" });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// 주소와 버디로 유저정보 업뎃
userRouter.patch("/update/:address", async (req, res) => {
  //userInfo update
  const { address } = req.params;
  const { nickName, image } = req.body;

  const userCheck = await User.exists({ address: address });
  if (!userCheck)
    return res
      .status(400)
      .send({ err: "파라미터에 담긴 지갑주소와 일치하는 유저를 찾을수 없다." });

  const updatedUser = await User.findOneAndUpdate(
    { address: address },
    { nickName, image },
    { new: true }
  );
  return res.send({ data: updatedUser, message: "OK" });
});

// 주소로 게시글 조회하기
userRouter.get("/myposts/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const userCheck = await User.exists({ address: address });
    if (!userCheck)
      return res
        .status(400)
        .send({ err: "파라미터에 담긴 지갑주소와 일치하는 유저를 찾을수 없다." });
    const user = await User.findOne({ address: address });
    const posts = await Post.find({ user_id: user._id });
    res.status(200).send({ data: posts, message: "OK" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// 주소로 댓글 조회하기
userRouter.get("/mycomments/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const userCheck = await User.exists({ address: address });
    if (!userCheck)
      return res
        .status(400)
        .send({ err: "파라미터에 담긴 지갑주소와 일치하는 유저를 찾을수 없다." });
    const user = await User.findOne({ address: address });
    const comments = await Comment.find({ user_id: user._id });
    res.status(200).send({ data: comments, message: "OK" });
  } catch (err) {
    res.status(500).send(err);
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
