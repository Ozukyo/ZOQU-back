const userDao = require('../dao/userDao');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const loginController = {
    login: async (req, res) => {
        try {
            let email = req.body.email;
            let password = req.body.password;
            const user = await userDao.getUserByEmail(email);
            if (user === null) {
                res.status(401);
            }
            if (!await comparePassword(password, user.password)) {
                res.status(401);
            }
            const payload = {
                email: user.email
            }
            res.json(generateAccessToken(payload));
        } catch (error) {
            console.log(error.message);
        }
    },
    authenticateToken: async (req, res, next) => {
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401) // if there isn't any token

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            console.log(err)
            if (err) return res.sendStatus(403)
            req.user = user
            next() // pass the execution off to whatever request the client intended
        })
    },
    hashPassword: async (password) => {
        console.log(password);
        return await bcrypt.hash(password, 10)
    }
}

function generateAccessToken(payload) {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
}

async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = loginController;
