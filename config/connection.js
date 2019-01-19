var mysql = require("mysql");

//Basic connetion setup
var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "snakegame"
})

connection.connect((err) => {
    if (err){
        console.error("error while connecting: "+ err.stack);
        return
    }
    console.log("connected as id: " + connection.threadId);
})

//exports the connetion for ORM
module.exports = connection;