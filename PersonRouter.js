const express = require('express');
const router=express.Router();
const Personmodel=require('./database/DataSchema.js');
const {jwtmiddleware,generatetoken}=require("./jwt.js");

router.post("/login",async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await Personmodel.findOne({username:username});
        if( !user|| !(await user.Compare(password))){
            return res.status(401).json({message:"Invalid username or password"});
        } 
        const payload={
            id:user.id,
            username:user.username
        }
const token=generatetoken(payload);
console.log("token :",token);
res.json("token :"+token)
        
    } catch (error) {
        res.status(500).json('error');
        console.log('error = ',error);
        
    }
})

router.post('/signup',async function(req, res){
    try {  
     const data=req.body;
   const newdata=new Personmodel(data);
   const saveddata=await newdata.save();
   const payload={
    id:saveddata.id,
    username:saveddata.username
   }
   const token=generatetoken(payload);

   res.status(200).json({response:saveddata,token:token});
   console.log("token :",token);
   console.log('data saved....');
        
    } catch (error) {
        res.status(500).json('error');
        console.log('error = ',error);
    }

})
router.put('/:id',async (req, res) =>{
    try {
         const id=req.params.id;
    const data=req.body;
    const updatedata=await Personmodel.findByIdAndUpdate(id,data,{
        new:true,
        runValidators:true
    })
    if(!updatedata){
        res.status(404).json('data not found');
        console.log('Enter different id');
    }
    res.status(200).json('data updated successufully...');
    console.log('data updated');
    } catch (error) {
        res.status(500).json('error');
        console.log('errror = ',error);
    }
   



})

router.delete('/:id',async(req,res)=>{
    try {
        const id =req.params.id;
       const deletedata= await Personmodel.findByIdAndDelete(id);
       if(!deletedata){
        res.status(404).json('data not found');   
        }
        res.status(200).json('data deleted successufully...');
        console.log('data deleted');
        
    } catch (error) {
        res.status(500).json('error');
        console.log('errror = ',error);
    }
})

//profile route

router.get('/profile',jwtmiddleware,async (req, res) =>{
try {
    const userdata=req.user;
    const userid=userdata.id;
    if(!userid)return res.status(404).json('invalid user id');
    const user=await Personmodel.findById(userid);
    
    res.status(200).json(user);
    
} catch (error) {
    res.status(500).json('internal server error');
    console.log('error = ',error);
    
}

});



router.get('/',jwtmiddleware,async (req, res) =>{
try {
    const data=await Personmodel.find();
    res.status(200).json(data);
    console.log('data shown...');
    
} catch (error) {
    res.status(500).json('error');
    console.log('error = ',error);
}


})


module.exports=router;