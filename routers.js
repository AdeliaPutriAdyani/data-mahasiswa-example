const express = require('express')
const router = express.Router()
const multer = require('./middlewares/multer'),
    multerLib = require('multer')();
const authController = require('./controllers/authControllers')
const checkToken = require('./middlewares/checkToken')
const imageController = require('./controllers/imageControllers')
const videoController = require('./controllers/videoControllers')

router.get('/', (req, res) => {
    return res.json({
        message: "Hello World"
    })
})

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/authenticate', checkToken, authController.getProfile)
router.get('/mahasiswa', authController.getMahasiswa)
router.get('/mahasiswa/:mahasiswaId', authController.getMahasiswaId)

router.post('/upImage', multer.image.single('image'), imageController.upImage),
router.get('/image', imageController.getImage)
router.get('/image/:imageId', imageController.getImageId)
router.post('/create-with-imagekit', multerLib.single('image'), imageController.createWithImageKit),
router.post('/upload', multerLib.single('image'), imageController.upload);


router.post('/upVideo', multer.video.single('video'), videoController.upVideo)
router.get('/video', videoController.getVideo)
router.get('/video/:videoId', videoController.getVideoId)

module.exports = router
