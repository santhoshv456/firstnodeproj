const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();


router.post('/', async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send('Invalid Request Body...');
    
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid UserNamae or Password');

    const result = await bcrypt.compare(req.body.password,user.password);
    if(!result) return res.status(400).send('Invalid UserNamae or Password');

    const token = user.generateAuthToken();

    res.send(token);
});


function validate(user)
{
    const schema = {
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(3).max(50).required()
    }

    return Joi.validate(user,schema);
}

module.exports = router;