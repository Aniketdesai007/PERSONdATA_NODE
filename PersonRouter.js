const express = require('express');
const router=express.Router();
const Personmodel=require('./database/DataSchema.js');


router.post('/person',async (req, res) =>{
    try {  
     const data=req.body;
   const newdata=new Personmodel(data);
   const saveddata=await newdata.save();
   res.status(200).json('data saved successufully...');
   console.log('data saved');
        
    } catch (error) {
        res.status(500).json('error');
        console.log('error = ',error);
    }

})
router.patch('/person/:id',async (req, res) =>{
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

router.delete('/person/:id',async(req,res)=>{
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

router.get('/person',async (req, res) =>{
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