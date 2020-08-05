const express = require('express');
const fs = require('fs');

var bodyParser = require('body-parser')



const app = express();
let server = app.listen(3000, () => {
    console.log("Listening to port 3000!");
});

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/st', (req, res) => {
    fs.readdir(__dirname + "/racuni/", function (error, files) {
        var totalFiles = files.length;
        res.send(" " + totalFiles);
    });
})

app.post('/wf', (req, res) => {

    console.log("Preparing to write file " + req.body.name);

    fs.writeFile("racuni/" + req.body.name + ".pdf", req.body.file,'binary', function (err) {
        if (err) throw err;
        res.send('Done')
    });
});