const User = require('../models/User');
const Router = require("express").Router();

Router.route('/create').post( async (req, res) => {
    try {
        let Email=req.body.email
        let user = await User.findOne({email:Email})
        if (user) {
            res.status(400).json({msg: "email aready taken"})
        }
        const newuser = new User(req.body)
        await newuser.save()
        res.json(newuser)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
 
})
module.exports = Router;
