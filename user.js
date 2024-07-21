const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema(
    {
        name:
        {
            type:String,
            required:true
        },
        email:
        {
            type:String,
            unique:true,
            required:true
        },
        role:
        {
            type:String,
            default:"user"
        },
        password:
        {
            type:String,
            required:true
        },
        date:
        {
            type:Date,
            default:Date.now
        }
    });

const User = mongoose.model('User', userSchema);
module.exports = User;