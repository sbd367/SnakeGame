var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SnakeSchema = new Schema({
    Username:{
        type: String,
        required: true
    },
    Points:{
        type: Number,
        required: true
    }
});

var Snake = mongoose.model("Snake", SnakeSchema);

module.exports = Snake;