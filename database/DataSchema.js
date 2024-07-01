const mongoose= require('mongoose');
const bcrypt= require('bcrypt');

const Personschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})
Personschema.methods.Compare=async function(candidatepassword){
    try {
        // const pass=this
        const isMatch=await bcrypt.compare(candidatepassword,this.password)
        return isMatch;
    } catch (error) {
        throw(error);
    }

}




Personschema.pre('save',async function(next){
const person=this;
if(!person.isModified('password'))return next();
    try {
        //hash password genertion
        const salt=await bcrypt.genSalt(10);
        
        //hash passwords

        const hashpassword=await bcrypt.hash(person.password,salt);
        person.password=hashpassword;
        next();
    } catch (error) {
        return next(error);
        
    }
})

const PersonModel=mongoose.model('PersonModel',Personschema);
module.exports = PersonModel;