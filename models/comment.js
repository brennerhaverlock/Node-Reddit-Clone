const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: "User"},

},
  {timestamps: {createdAt: 'created_at'}}
);


module.exports = mongoose.model("Comment", CommentSchema);