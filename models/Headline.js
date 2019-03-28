const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HeadLineSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: false,
    unique: true
  },
  summary: {
    type: String,
    required: false
  },

  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

const HeadLine = mongoose.model("HeadLine", HeadLineSchema);

module.exports = HeadLine;
