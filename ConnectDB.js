const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect("mongodb+srv://rushi17092004:rushi123@cluster0.4bc8xaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(()=>console.log("connected successfully"))
  .catch(err=>console.log(err));
};
module.exports = connect;
