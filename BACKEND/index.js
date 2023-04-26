const express = require('express');
const app = express();
const {PORT} = require('./src/config')
app.listen(PORT, ()=>{
    console.log(`servidor corriendo en el puerto ${PORT}`)
})