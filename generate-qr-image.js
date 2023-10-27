const qr = require('node-qr-image');
const fs = require('fs');

const imagePath = '/images/1698379951279-aaa.jpg'; 
const imageUrl = 'http://localhost:3000' + imagePath; 
const qrCode = qr.image(imageUrl, { type: 'png' });
const outputPath = './public/images/qrcode/qr-code-image.png';

qrCode.pipe(fs.createWriteStream(outputPath, 'utf8'))
  .on('error', (err) => {
    console.error('Gagal membuat QR Code:', err);
  })
  .on('finish', () => {
    console.log(`QR Code berhasil dibuat dan disimpan di ${outputPath}`);
  });