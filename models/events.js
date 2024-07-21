const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    unique: true,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  volunteers: [
    {
      id: { type: Schema.Types.ObjectId, ref: "User" },
      email: { type: String },
    },
  ],
  organizers: [
    {
      id: { type: Schema.Types.ObjectId, ref: "User" },
      email: { type: String },
    },
  ],
  winners: [
    {
      name: String,
      position: Number,
    },
  ],
  isUpcoming:{
    type:Boolean,
    default:true
  },
  venue:{
    type:String
  },
  prizeDetails:
  [
    {
      description: String,
      position: Number,
    },
  ],
  rating:
  {
    type:mongoose.Types.Decimal128
    
  }
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
