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

    },

    getImageId: async (req, res) => {

    }
}