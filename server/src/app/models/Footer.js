const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Footer = new Schema({
    key: {
        type: String,
        required: true,
        default: 'footer'
    },
    connect: {
        type: Array,
        default: null
    },
    contact: {
        type: Array,
        default: null
    },
    support: {
        type: Array,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Footer', Footer);
