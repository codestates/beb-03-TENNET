const {User, Post, Comment} = require("../../models");

module.exports = {
    post: async (req, res) => {
        const { postId, userId, contents } = req.body;
    // 요청 검증
        // 요청 body 필요한 값 전부 전달 받았는가?
        if (!postId || !userId || !contents) {
            return res.status(422).send("Validation Error");
        };
        // postId 유효한가? (DB에 존재하는 게시글인가) (요청 전에 이미 프론트에서는 게시글 정보를 가진 상태일텐데, 최소한의 확은 해야겟지?)
        const post = await Post.findOne({_id: postId});
        if (!post) {
            return res.status(422).send("postId is wrong! failed to find this post.");
        };
        // userId 유효한가? (DB에 존재하는 유저인가) (요청 전에 프론트에서 유저 정보를 받은 상태라면 필요없는 과정일까?)
        const user = await User.findOne({_id: userId});
        if (!user) {
            return res.status(422).send("userId is wrong! failed to find this user.");
        };
        // contents 중복검증 (하나의 포스트 기준, 한 유저는 같은내용의 댓글을 한번만 작성할 수 있음)
        const comment = await Comment.findOne({post_id: postId, user_id: userId, contents: contents});
        if (comment) {
            return res.status(422).send("Duplicated contents");
        };

    // 도큐먼트 생성하고 응답하기
        
        const newComment = new Comment({
            post_id: postId,
            user_id: userId,
            contents: contents,
        });    

        try {
            await newComment.save();
            res.status(201).send({data: newComment, message: "success"});
        } catch (err) {
            res.status(500).send(err);
        };
    }
}