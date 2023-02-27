const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
//
require('dotenv').config();
//
const bcrypt = require('bcrypt');
router.post('/signup',(req, res) => {
    console.log('send by client - ', req.body);
    const {username, email, password} = req.body;
    if (!email || !password || !username){
        return res.status(422).json({error:"Please fill all the fields"});
    }
    
    User.findOne({email: email})
        .then(async (savedUser) => {
            if(savedUser){
                return res.status(422).json({error: "Invalid Credentials"});
            }
            const user = new User({
                username,
                email,
                password
            })

            try{
                await user.save();
                const token = jwt.sign({_id: user._id }, process.env.JWT_SECRET);
                res.send({ token });
            }
            catch (err) {
                console.log(err);
            }
        })
})

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({ error: "please add email and password"});
    }
    const savedUser = await User.findOne({ email: email })

    if(!savedUser){
        return res.status(422).json({ error: "Invalid Credentials" });
    }

    try {
        bcrypt.compare(password, savedUser.password, (err, result) =>{
            if(result){
                console.log("Password match");
                const token = jwt.sign({_id: savedUser._id}, process.env.JWT_SECRET);
                res.send({ token});
            }
            else{
                console.log("Password does not match");
                return res.status(422).json({error: "Invalid Credentials"});
            }
        })
    }
    catch(err){ 
        console.log(err);
    }

})

module.exports = router; 