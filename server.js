let PORT = process.env.PORT || 8080;
let path = require('path');
let express = require('express');
let app = express();

// // Static directory
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/client/index.html"));
});

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, "/client/app.js"));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, "/client/style.css"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});