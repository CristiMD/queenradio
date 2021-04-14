const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2
    },
    url: {
        type: String,
        required: true,
        min: 2
    },
    cover: {
        type: String,
        required: true,
        min: 2
    }
})

module.exports = mongoose.model('Song', songSchema);