const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const feedbackSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Events",
  },
  user: [
    {
      name: String,
      id: Schema.Types.ObjectId,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  rating: {
    type: mongoose.Types.Decimal128,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
