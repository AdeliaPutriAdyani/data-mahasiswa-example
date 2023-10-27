const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const cryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(5);

    return bcrypt.hash(password, salt)
}

const prisma = new PrismaClient();

module.exports = {
    register: async (req, res) => {
        const user = await prisma.mahasiswa.create({
            data: {
                nama: req.body.nama,
                nim: req.body.nim,
                password: await cryptPassword(req.body.password)
            }
        });

        return res.json({
            data:user
        });
    },

    login: async (req, res) => {
        const findUser = await prisma.mahasiswa.findFirst({
            where: {
                nim: req.body.nim
            }
        })

        if(!findUser){
            return res.status(404).json({
                error: 'NIM tidak terdaftar'
            });
        }

        if(bcrypt.compareSync(req.body.password, findUser.password)) {
            const token = jwt.sign({id: findUser.id}, 'secret_key', { expiresIn : '6h'})

            return res.status(200).json({
                data: {
                    token
                }
            })
        }

        return res.status(403).json({
            error: 'Invalid Credentials'
        });
    },

    getProfile: async (req, res) => {
        const user = await prisma.mahasiswa.findUnique({
            where: {
                id: res.mahasiswa.id
            }
        })

        return res.status(200).json({
            data: user
        })
    },

    getMahasiswa: async (req, res) => {
        const user = await prisma.mahasiswa.findMany();
        
        return res.json({
            data: user
        });
    },

    getMahasiswaId: async (req, res) => {
        const mahasiswaId = parseInt(req.params.mahasiswaId);
    
        const user = await prisma.mahasiswa.findUnique({
            where: {
                id: mahasiswaId
            },
            include: {
                images: true,
                videos: true
            }
        });
    
        if (!user) {
            return res.status(404).json({
                error: 'Data mahasiswa tidak ditemukan'
            });
        }
    
        return res.status(200).json({
            data: user
        });
    }
}    