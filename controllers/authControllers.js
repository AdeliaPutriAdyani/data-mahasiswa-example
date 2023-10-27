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

    },

    getProfile: async (req, res) => {

    },

    getUser: async (req, res) => {

    },

    getUserId: async (req, res) => {

    }
}