const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // console.log(password);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword});
        await user.save();
        res.status(201).json({ message: 'User created successfully'});
    } catch (error) {
        console.error('Error in signUp:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
};

const signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ error: 'Inavlid email or password'});
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) {
            return res.status(401).json({error: 'Invalid email or password'});
        }
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET);
        res.status(200).json({ token});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error'});
    }
};

module.exports = { signUp, signIn};