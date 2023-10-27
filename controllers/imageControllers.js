const { PrismaClient } = require('@prisma/client')

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
    }    
}    