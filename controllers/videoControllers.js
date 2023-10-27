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
        const videos = await prisma.video.findMany();
        
        return res.json({
            data: videos
        });
    },

    getVideoId: async (req, res) => {
        const videoId = parseInt(req.params.videoId);
    
        const videosId = await prisma.video.findUnique({
            where: {
                id: videoId
            },
            include: {
                mahasiswa: true
            }
        });
    
        return res.json({
            data: videosId
        });
    }    
}    