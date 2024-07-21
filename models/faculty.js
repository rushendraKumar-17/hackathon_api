const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const facultySchema=new Schema(
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
        password:
        {
            type:String,
            required:true
        },
        role:
        {
            type:String,
            default:"faculty"
        },
        date:
        {
            type:Date,
            default:Date.now
        }
    });

const Faculty = mongoose.model('Faculty', facultySchema);
module.exports = Faculty;