const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ipfs: { type: String, required: true, unique: true },
    title: { type: String },
    contents: [ String ],
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);

module.exports = Post;