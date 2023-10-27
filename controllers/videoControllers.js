const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    upVideo: async (req, res) => {
        const { video, mahasiswaId } = req.body;
        const newVideo = await prisma.video.create({
            data: {
                video: `/videos/${req.file.filename}`,
                mahasiswaId: parseInt(mahasiswaId)
            }
        });

        return res.json({
            data:newVideo
        });
    },

    getVideo: async (req, res) => {

    },

    getVideoId: async (req, res) => {

    }
}