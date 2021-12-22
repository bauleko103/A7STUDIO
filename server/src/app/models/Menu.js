const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Menu = new Schema({
    title: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Menu', Menu);
