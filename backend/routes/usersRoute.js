const router = require('express').Router();
const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');


//register new user
router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status({
                message: 'An account with this email already exists.',
                success: false,
                data: null,

            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = new User(req.body)
        await newUser.save();
        res.send({
            message: 'User created successfully.',
            success: true,
            data: null,
        });
    }
    catch (error) {
        res.send({
            message: 'An error occurred.',
            success: false,
            data: null,
        })
    }

});

module.exports = router;