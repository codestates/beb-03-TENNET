const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ipfs: { type: String, required: true, unique: true },
    title: { type: String },
    contents: [ String ],
    contractAddress: { type: String, required: true },
    tokenId: { type: String, required: true },
    editList: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    parentId: { type: Schema.Types.ObjectId, ref: "Post" },
    childrenIds: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);

module.exports = {Post};