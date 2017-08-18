const express = require('express')
const app = express();
const bodyParser = require("body-parser");
var data = require("./data.js");
const mustacheExpress = require("mustache-express");
// set up rendering engine mustache-express

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.render('employee', data);

});

app.get("/", (req, res) => {
    //create variable 
    //Look at href on emp. 
    //Find Indentifier(individuals... app.find) for parsing through data 

    let checkData = users.find(user => user.username === reqUsername);

    res.render('profile', dataPage);
});





// get and use url name parameter to find the matching user in the users array. 
// use that object to render the profile page.









// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

app.listen(3000, function () {
    console.log('Successfully started express application!');
});

