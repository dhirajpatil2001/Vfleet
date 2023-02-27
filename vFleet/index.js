const express = require('express');
const port=3000;

const app= express();
const bodyParser= require('body-parser');


//
app.use(bodyParser.json());
//

app.get('/',(req,res)=>{
    res.send('This is home page');
})

app.listen(port,()=>{
    console.log('server is running on port ${port}');
})