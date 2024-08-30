const { userData } = require('../schema.js')
const bcrypt = require('bcrypt')
require('dotenv').config()

const SALT_ROUND = process.env.SALT_ROUND

const signin = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const salt = await bcrypt.genSalt(SALT_ROUND)
        const hash = await bcrypt.hash(password, salt)
        const newUser = new userData({
            name: name,
            email: email,
            password: hash
        })
        await newUser.save()
        res.json({
            msg: "[DATA SAVED]"
        })
    } catch (error) {
        res.status(400).json({ error: error })
    }

}

module.exports = { signin }