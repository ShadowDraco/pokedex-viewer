const express = require('express')
const router = express.Router()

const likes = {}
for (let i = 0; i < 100; i++) {
  likes[i] = 0
}

router.get('/likes/:id', (req, res) => {
  let likeValue
  likeValue = likes[req.params.id] ? likes[req.params.id] : 0

  res.json({ likes: likeValue }).status(200)
})

router.put('/like/:id', (req, res) => {
  let id = req.params.id
  likes[id] = likes[id] + 1

  res.json({ message: 'liked! ', from: 'admin' }).status(200)
})

module.exports = router
