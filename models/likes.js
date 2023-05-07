const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
	id: Number,
	value: Number,
})

module.exports = mongoose.model('Likes', likeSchema)
