const mongoose= require('mongoose');
// require('dotenv').config();
// const url=process.env.url;

mongoose.connect("mongodb+srv://Aniket:Aniket12345@cluster0.cpkm9m0.mongodb.net/");
const db=mongoose.connection;


db.on('error', (err) =>{
    console.log(err);
});
db.on('connected', ()=>{
        console.log('successfully connected to mongodb database');
})

db.on('disconnected', ()=>{
    console.log('disconnected from mongodb database');
})

module.exports=db;