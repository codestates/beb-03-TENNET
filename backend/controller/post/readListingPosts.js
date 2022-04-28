const { User, Post, Comment } = require("../../models");
const { makeFullPostPayload } = require("../../utils");

module.exports = {
    get: async (req, res) => {
        try {
            // 기본값으로 전체 응답
            const posts = await Post.find({});
            const users = await User.find({});
            const comments = await Comment.find({});
    
            // payload 생성
            const payload = makeFullPostPayload(posts, users, comments);
    
            res.status(200).send({data: payload, message: "Successful Response"});
        } catch (err) {
            res.status(500).send({data: null, message: err.message});
        }
    }
};