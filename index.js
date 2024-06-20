const exp=require('express');
const app = exp();
const db = require('./database/data.js');
const bodyparser=require('body-parser');
const Personmodel=require('./database/DataSchema.js');
app.use(bodyparser.json());
app.get('/', (req, res) =>{
    res.send('Hello World');
})


app.post('/person',async (req, res) =>{
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
app.patch('/person/:id',async (req, res) =>{
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

app.delete('/person/:id',async(req,res)=>{
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

app.get('/person',async (req, res) =>{
try {
    const data=await Personmodel.find();
    res.status(200).json(data);
    console.log('data shown...');
    
} catch (error) {
    res.status(500).json('error');
    console.log('error = ',error);
}


})

app.listen(800,()=>{
    console.log('Server is running on port 800');
})