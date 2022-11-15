const router = require('express').Router();
const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddlewares = require('../middlewares/authMiddlewares');


//register new user
router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email }); //check if user already exists  
        if (existingUser) { //  if user exists, return error    
            return res.status({
                message: 'An account with this email already exists.',
                success: false,
                data: null,

            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);        //hash password before saving to db 
        req.body.password = hashedPassword; //replace password with hashed password 
        const newUser = new User(req.body)
        await newUser.save();
        res.send({
            message: 'User created successfully.',
            success: true,
            data: null,
        });
    }
    catch (error) {  //catch any errors
        res.send({
            message: 'An error occurred.',
            success: false,
            data: null,
        })
    }

});

//login user
router.post('/login', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (!userExists) {
            return res.send({
                message: 'User does not exist.',
                success: false,
                data: null,
            });
        }

        if (userExists.isBlocked) {
            return res.send({
                message: 'User Account is Bloked, Please Contact Admin',
                success: false,
                data: null,
            });
        }


        const passwordMatch = await bcrypt.compare(req.body.password, userExists.password);
        if (!passwordMatch) {
            return res.send({
                message: 'Incorrect password.',
                success: false,
                data: null,
            });
        }
        const token = jwt.sign({ userId: userExists._id }, process.env.jwt_secret, { expiresIn: "1h" });

        res.send({
            message: 'User logged in successfully.',
            success: true,
            data: token,
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

//get user by id 
router.post("/get-user-by-id", authMiddlewares, async (req, res) => {  //authMiddlewares is a middleware function that checks if the user is logged in
    try {
        const user = await User.findById(req.body.userId);  //find user by id
        res.send({
            message: 'User fetched successfully.',
            success: true,
            data: user,
        });
    } catch (error) {
        res.send({
            message: 'An error occurred.',
            success: false,
            data: null,
        })

    }
});

//get all users
router.get("/get-all-users", authMiddlewares, async (req, res) => {
    try {
        const users = await User.find();  //find all users
        res.send({
            message: 'Users fetched successfully.',
            success: true,
            data: users,
        });
    } catch (error) {
        res.send({
            message: 'An error occurred.',
            success: false,
            data: null,
        })
    }
});

//Block users
router.post("/block-user", authMiddlewares, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);  //find user by id
        user.isBlocked = true;  //set isBlocked to true
        await user.save();  //save user
        res.send({
            message: 'User blocked successfully.',
            success: true,
            data: null,
        });
    } catch (error) {
        res.send({
            message: 'An error occurred.',
            success: false,
            data: null,
        })
    }
});

//Unblock users
router.post("/unblock-user", authMiddlewares, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);  //find user by id
        user.isBlocked = false;  //set isBlocked to false
        await user.save();  //save user
        res.send({
            message: 'User unblocked successfully.',
            success: true,
            data: null,
        });
    } catch (error) {
        res.send({
            message: 'An error occurred.',
            success: false,
            data: null,
        })
    }
});

//update user
router.put("/:id", authMiddlewares, async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.id, req.body);  //find user by id and update
            return res.status(200).send
                ({
                    message: 'User updated successfully.',
                    success: true,
                });
        } catch (error) {
            res.status(500).send(
                {
                    message: 'An error occurred.',
                    success: false,
                });
        }
    });


//update user
router.post("/update-user-permissions", authMiddlewares, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.body._id, req.body);
        res.send({
            message: 'User Permissions Update Successfully',
            success: true,
            data: null,
        });

    } catch (error) {
        res.send({
            message: 'An error occurred.',
            success: false,
            data: null,
        })
    }
});


module.exports = router;