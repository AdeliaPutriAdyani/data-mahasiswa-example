const qr = require('node-qr-image')
const fs = require('fs')

const videoPath = '/videos/1698380494462-1.mp4'
const videoUrl = 'http://localhost:3000' + videoPath
const qrCode = qr.image(videoUrl, { type: 'png' })
const outputPath = './public/videos/qrcode/qr-code-videos.png'

qrCode.pipe(fs.createWriteStream(outputPath, 'utf8'))
  .on('error', (err) => {
    console.error('Gagal membuat QR Code:', err);
  })
  .on('finish', () => {
    console.log(`QR Code berhasil dibuat dan disimpan di ${outputPath}`);
  });