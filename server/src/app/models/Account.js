const mongoose = require('mongoose');
const mongooseDlete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Account = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

Account.plugin(mongooseDlete, {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: true
});

module.exports = mongoose.model('Account', Account);
