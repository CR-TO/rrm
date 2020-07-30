const express = require('express');
const fs = require('fs');


const app = express();
let server  = app.listen(3000, () => {
    console.log("Listening to port 3000!"); 
});

app.use(express.static('public'));

app.get('/st', (req,res)=>{
    fs.readdir( 'C:/Users/Shadow/old desktop/dev/js_dev/racun_gen/racuni/', function(error, files) {  
        var totalFiles = files.length;
        res.send(" " + totalFiles);
    });
})  