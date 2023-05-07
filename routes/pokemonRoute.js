const express = require('express')
const router = express.Router()

const Likes = require('../models/likes')
const createNewLike = async id => {
	const newLikes = new Likes({ id: id, value: 0 })
	await newLikes.save()
	console.log('new likes created for id: ', id)
}

router.get('/likes/:id', async (req, res) => {
	let status

	try {
		let likeValue = await Likes.findOne({ id: req.params.id })

		if (likeValue) {
			status = { status: 'success', likes: likeValue.value, code: 200 }
		} else {
			status = { status: 'creating value for new pokemon', likes: 0, code: 200 }
			createNewLike(req.params.id) // add a new id with a like value of 0 to the database
		}
	} catch (error) {
		status = { status: 'failed to get likes', error: error.message, code: 500 }
	}

	res.json(status).status(status.code)
})

router.put('/like/:id', async (req, res) => {
	let id = req.params.id
	let status

	try {
		let updatedLikes = await Likes.findOneAndUpdate(
			{ id: id },
			{ $inc: { value: 1 } },
			{ returnDocument: 'after' }
		)

		status = { status: 'success', likes: updatedLikes }
	} catch (error) {
		status = { status: 'failed to like', error: error.message, code: 500 }
	}

	res.json(status).status(status.status)
})

module.exports = router
