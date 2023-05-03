
const Thought = require('../models/Thoughts');
const User = require('../models/User');
const Reaction = require('../models/Reaction');


const { ObjectId } = require('mongoose').Types;
const Router = require("express").Router();

Router.route('/create').post( async (req, res) => {
    try {
    
        
       
        const newThoutgh = new Thought(req.body)
        await newThoutgh.save()
     
        await User.updateOne({ userName: req.body.userName }, { $push: { thoughts:new ObjectId(newThoutgh._id) } },{new:true})
       
        res.json(newThoutgh)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
 
})
Router.route('/allthougts').get( async (req, res) => {
    try {
       
        let thouhts = await Thought.find()
        if (!thouhts) {
            res.status(400).json({msg:"No thouhts found"})
        }
       
     
        res.json(thouhts)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
 
})
Router.route('/:id').get( async (req, res) => {
    try {
        let id=req.params.id
        let thought = await Thought.findOne({_id:id})
        if (!thought) {
            res.status(400).json({msg: "thought not found"})
        }
        res.json(thought)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
 
})
Router.route('/update/:id').put( async (req, res) => {
    try {
        let id=req.params.id
       
        let thought = await Thought.findOneAndUpdate({_id:id},req.body,{new:true})
        if (!thought) {
            res.status(400).json({msg: "thought not found"})
        }
        res.json(thought)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
 
})
Router.route('/remove/:id').delete( async (req, res) => {
    try {
        let id=req.params.id
       
        let thought = await Thought.findOneAndDelete({_id:id})
        if (!thought) {
            res.status(400).json({msg: " thought not found"})
        }
        res.json({msg:`thought is deleted form database`})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
 
})
Router.route('/:thoughtId/reaction').post( async (req, res) => {
    try {
    
        
       
        const newReaction = new Reaction(req.body)
        await newReaction.save()
     
        await Thought.updateOne({ _id: req.params.thoughtId}, { $push: { reactions:new ObjectId(newReaction._id) } },{new:true})
       
        res.json(newReaction)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
 
})
Router.route('/:thoughtId/reaction/').delete( async (req, res) => {
    try {
    
      let reactionId=req.body.reactionId
          let reaction = await Thought.findOne({_id:req.params.thoughtId})
        if (!reaction) {
            res.status(400).json({msg: " thought not found"})
        }
       
       
     
        await Thought.updateOne({ _id: req.params.thoughtId}, { $pull: { reactions:new ObjectId(reactionId) } },{new:true})
       
        res.json({msg:"reaction removed"})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
 
})
module.exports = Router;
