const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDlete = require('mongoose-delete');
const Schema = mongoose.Schema;

const News = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

News.plugin(mongooseDlete, {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: true
});
mongoose.plugin(slug);

module.exports = mongoose.model('News', News);
