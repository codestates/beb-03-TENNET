const { Router } = require("express");
const postRouter = Router();

const { postsController } = require('../controller');

// GET /post/list/ : 게시물의 완전한 조회
postRouter.get("/list/", postsController.readListingPosts.get);

// POST /post/write/ : 게시글 쓰기
postRouter.post('/write/', postsController.writePost.post);

// POST /post/comment/write/ : 게시글에 댓글 쓰기
postRouter.post('/comment/write/', postsController.writeComment.post);

module.exports = {postRouter};
