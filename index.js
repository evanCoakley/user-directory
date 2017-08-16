const express = require('express')
const app = express();
var data = require("./data.js");
const mustacheExpress = require("mustache-express");
// set up rendering engine mustache-express

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.get("/", (req, res) => {
    res.render('employee', data);

});






// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

app.listen(3000, function () {
    console.log('Successfully started express application!');
});

