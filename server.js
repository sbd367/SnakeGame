let PORT = process.env.PORT || 8080;
let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let db = require("./models");
let logger = require('morgan');
let mongoose = require('mongoose');

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/snakeGame";

console.log(process.env.MONGODB_URI);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true});

// // Static directory
app.use(express.static("public"));
app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/client/index.html"));
});

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, "/client/app.js"));
});


app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, "/client/style.css"));
});

app.post('/api/scores', (req, res) =>{
    console.log(req.body)
    let username = req.body.username;
    let score = req.body.points;

    db.Score.create(req.body).then(() => console.log("it did something"))
    .catch((err) => console.log(err));

});

app.get("/api/theScores", (req, res) => {
    db.Score.find({}, (err, data) => {
        if(err) console.log(err)
        else res.json(data);
    })
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})