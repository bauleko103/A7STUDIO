const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDlete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Project = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    images: {
        type: Array,
        required: true,
        default: []
    },
    subtitle: {
        type: String,
        required: true,
        default: '',
        maxlength: 100
    },
    description: {
        type: String,
        default: ''
    },
    architectId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

Project.plugin(mongooseDlete, {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: true
});
mongoose.plugin(slug);

module.exports = mongoose.model('Project', Project);
