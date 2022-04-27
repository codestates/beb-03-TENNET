require("dotenv").config();
const { Router } = require("express");
const postRouter = Router();
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

// posts 응답
postRouter.get("/list/", async (req, res) => {
    try {
        // 기본값으로 전체 응답
        const posts = await Post.find({});
        const users = await User.find({});
        const comments = await Comment.find({});

        // payload 생성
        const payload = makePayload(posts, users, comments);

        res.status(200).send({data: payload, message: "Successful Response"});
    } catch (err) {
        res.status(500).send({data: null, message: err.message});
    }
});


module.exports = {
    postRouter,
};


// payload 생성 함수
function makePayload(posts, users, comments) {

    const result = posts.map(post => {
        const user = users.find(user => user._id.equals(post.user_id));
        const commentsOnPost = comments.filter(comment => comment.post_id.equals(post._id)).map(comment => {
            const commentUser = users.find(user => user._id.equals(comment.user_id));
            return {
                id: comment._id,
                userId: commentUser._id,
                userNickName: commentUser.nickName,
                contents: comment.contents,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
            }
        })

        return {
            id: post._id,
            userId: post.user_id,
            userNickName: user.nickName,
            userAddress: user.address,
            ipfs: post.ipfs,
            title: post.title,
            contents: post.contents,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            comments: commentsOnPost
        }
    });

    return result;
}