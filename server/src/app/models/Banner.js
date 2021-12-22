const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Banner = new Schema({
    key: {
        type: String,
        required: true,
        default: 'banner'
    },
    banners: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Banner', Banner);
