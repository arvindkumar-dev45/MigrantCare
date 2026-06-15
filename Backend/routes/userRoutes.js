const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser =
        await User.findOne({ email });

        if (existingUser) {
            return res.send("Email already registered");
        }

        await User.create({
            name,
            email,
            password,
            role: "user"
        });

        res.send("User Registered Successfully");

    } catch (error) {

        console.log(error);
        res.status(500).send("Server Error");

    }

});






router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email,
            password
        });

        if (!user) {
            return res.send("Invalid Email or Password");
        }

        res.json({
            message: "Login Successful",
            user
        });

    } catch (error) {

        console.log(error);
        res.status(500).send("Server Error");

    }

});



module.exports = router;