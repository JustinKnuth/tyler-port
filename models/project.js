const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema(
    {
        title: { type: String, required: true },
        image_url: { type: String, required: true },
        description: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('projects', Project)