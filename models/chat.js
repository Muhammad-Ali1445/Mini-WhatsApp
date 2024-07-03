const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    maxLength: 50,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// chatSchema.pre("save", function (next) {
//   this.updated_at = Date.now();
//   next();
// });

// chatSchema.pre("findOneAndUpdate", function (next) {
//   this.set({ updated_at: Date.now() });
//   next();
// });

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
