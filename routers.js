const express = require('express')
const router = express.Router()
const multer = require('./middlewares/multer')
const authController = require('./controllers/authControllers')
const imageController = require('./controllers/imageControllers')
const videoController = require('./controllers/videoControllers')

router.get('/', (req, res) => {
    return res.json({
        message: "Hello World"
    })
})

router.post('/register', authController.register),
router.post('/upImage', multer.image.single('image'), imageController.upImage),
router.post('/upVideo', multer.video.single('video'), videoController.upVideo)
module.exports = router
