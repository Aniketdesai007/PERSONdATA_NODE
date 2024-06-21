const exp=require('express');
const app = exp();
const db = require('./database/data.js');
const bodyparser=require('body-parser');
const Personrouter=require('./PersonRouter');
// const passport=require('passport');
// const localstrategy=require('passport-local').Strategy;
require('dotenv').config();
const port=process.env.port || 800;
// const logrequest=(req,res,next)=>{
//     console.log(`${new Date().toLocaleString()} request made to :${req.originalUrl}`);
//     next();
// }


// app.use(logrequest);
app.use(bodyparser.json());
app.get('/', (req, res) =>{
    res.send('Hello World');
})


app.use('/',Personrouter);


app.listen(port,()=>{
    console.log('Server is running on port 800');
})