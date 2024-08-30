const { userData } = require('../schema.js')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
require('dotenv').config()

const KEY = process.env.KEY

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const user = await userData.findOne({
            email: email
        })

        if (!user) {
            res.status(404).json({ error: "user not found" })
            return
        }

        const hash = user.password
        const flag =await bcrypt.compare(password, hash)
        if (flag) { 
            const token = jwt.sign({
                userName: user.name,
                email: user.email
            }, KEY, { expiresIn: "6h" })

            res.json({
                token: token , 
                name : user.name
            })
        }
        else {
            return res.status(400).json({ msg: "wrong password" })
        }
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

module.exports = { login }