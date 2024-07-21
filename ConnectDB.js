const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect("mongodb://localhost:27017/Hackathon")
  .then(()=>console.log("connected successfully"))
  .catch(err=>console.log(err));
};
module.exports = connect;
