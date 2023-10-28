const { PrismaClient } = require('@prisma/client')
const { imageKit } = require('../utils');

const prisma = new PrismaClient();

module.exports = {
    upImage : async (req, res) => {
        const { image, mahasiswaId } = req.body;
          const newImage = await prisma.image.create({
            data: {
              image: `/images/${req.file.filename}`,
              mahasiswaId: parseInt(mahasiswaId)
            },
          });
          return res.json({
            data:newImage
        });
      },

    getImage: async (req, res) => {
        const foto = await prisma.image.findMany();
        
        return res.json({
            data: foto
        });
    },

    getImageId: async (req, res) => {
        const imageId = parseInt(req.params.imageId);
    
        const fotoId = await prisma.image.findUnique({
            where: {
                id: imageId
            },
            include: {
                mahasiswa: true
            }
        });
    
        return res.json({
            data: fotoId
        });
    },

    createWithImageKit: async (req, res) => {
        const fileTostring = req.file.buffer.toString('base64');
        const uploadFile = await imageKit.upload({
            fileName: req.file.originalname,
            file: fileTostring
        });

        const { image, mahasiswaId } = req.body;
          const newImage = await prisma.image.create({
            data: {
              image: uploadFile.url,
              mahasiswaId: parseInt(mahasiswaId)
            },
          });
          return res.json({
            data:newImage
        });
    },
    
    upload: async (req, res) => {
        
            const fileTostring = req.file.buffer.toString('base64');

            const uploadFile = await imageKit.upload({
                fileName: req.file.originalname,
                file: fileTostring
            });

            return res.status(200).json({
                data: {
                    name: uploadFile.name,
                    url: uploadFile.url,
                    type: uploadFile.fileType
                }
            })
        
    }
}