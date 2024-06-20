const exp=require('express');
const app = exp();
const db = require('./database/data.js');
const bodyparser=require('body-parser');
const Personrouter=require('./PersonRouter');
require('dotenv').config();
const port=process.env.port || 800;
app.use(bodyparser.json());
app.get('/', (req, res) =>{
    res.send('Hello World');
})

app.use('/',Personrouter);


app.listen(port,()=>{
    console.log('Server is running on port 800');
})