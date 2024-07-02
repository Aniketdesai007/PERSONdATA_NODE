const exp=require('express');
const app = exp();
const db = require('./database/data.js');
const bodyparser=require('body-parser');
const Personrouter=require('./PersonRouter');
const passport=require('./aut');
const dataschema = require('./database/DataSchema.js')



require('dotenv').config();
const logrequest=(req,res,next) => {
    console.log(`[${new Date().toLocaleString()}] with url ${req.url}`);
    next();
}
const port=process.env.port || 800;

app.use(bodyparser.json());
app.use(passport.initialize());

const localauthmiddleware=passport.authenticate('local',{session:false});

app.get('/',logrequest, (req, res) =>{
    res.send('ssuccfully authenticated.........');
})

app.use('/person',Personrouter);


app.listen(port,()=>{
    console.log('Server is running on port 800');
})