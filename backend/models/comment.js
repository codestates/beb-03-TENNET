const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contents: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = model("Comment", CommentSchema);

module.exports = Comment;