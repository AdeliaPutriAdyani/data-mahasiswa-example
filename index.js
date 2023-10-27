const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000
const router = require('./routers')
const cors = require('cors');

app.use(express.json());
app.use(cors())
app.use('/images', express.static('public/images'))
app.use('/videos', express.static('public/videos'))
app.use('/api/v1', router)

app.get('*', (req, res) => {
    return res.status(404).json({
        error: 'End point is not registered'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})