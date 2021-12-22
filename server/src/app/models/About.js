const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const About = new Schema({
    key: {
        type: String,
        required: true,
        default: 'about-key'
    },
    text: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('About', About);
