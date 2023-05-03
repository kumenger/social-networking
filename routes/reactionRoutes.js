
const Reaction = require('../models/Reaction');
const Router = require("express").Router();

Router.route('/').get( async (req, res) => {
    try {
       
        let reaction = await Reaction.find()
        if (!reaction) {
            res.status(400).json({msg:"No reaction found"})
        }
       
     
        res.json(reaction)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
 
})
module.exports=Router