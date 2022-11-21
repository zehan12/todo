var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: {type: Boolean, default: false},
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
