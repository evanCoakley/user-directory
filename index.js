const express = require('express')
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectID;
const app = express();
const bodyParser = require("body-parser");
const data = require("./data");
const mustacheExpress = require("mustache-express");
const dbUrl = "mongodb://localhost:27017/userDirectory"
let DB;
let Robots;

//connecting to database
MongoClient.connect(dbUrl, function (err, db) {
    if (err) {
        return console.log("Error connecting to the database:", err)
    }
    DB = db;
    Robots = db.collection("robots");
});

// // write a endpoint that inserts the data.users array into the robots collection
// app.get("/addrobots", (req, res) => {
//     Robots.insertMany(data.users, function (err, savedRobots) {
//         if (err) {
//             res.status(500).send(err);
//         }
//         res.send(savedRobots);
//     })
// })

// set up rendering engine mustache-express
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static("./public"));

// app.get("/", (req, res) => {
//     res.render('employee', data);

// });

// app.get("/profile/:id", (req, res) => {


//     let reqId = req.params.id;
//     let foundUser = data.users.find(user => user.id == reqId);
//     res.render('profile', { data: foundUser });


// });
app.get("/", (req, res) => {
    Robots.find({}).toArray((err, foundRobots) => {
        if (err) res.status(500).send(err);
        res.render("employee", { users: foundRobots });
    });
});

app.get("/profile/:id", (req, res) => {
    Robots.findOne({ _id: ObjectId(req.params.id) }, (err, foundRobot) => {
        if (err) res.status(500).send(err);
        if (!foundRobot) res.send("No user found");
        res.render("profile", { data: foundRobot });
    });
});

app.get("/forhire", (req, res) => {
    Robots.find({ job: null }).toArray((err, forHireBots) => {
        if (err) res.status(500).send(err);
        res.render("employee", { users: forHireBots });

    });


});
app.get("/employed", (req, res) => {
    Robots.find({ job: { $ne: null } }).toArray((err, employedBots) => {
        if (err) res.status(500).send(err);
        res.render("employee", { users: employedBots })
    })
})




app.listen(3000, function () {
    console.log('Successfully started express application!');
});

