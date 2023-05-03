const User = require('../models/User');
const Router = require("express").Router();
const { ObjectId } = require('mongoose').Types;
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
Router.route('/allusers').get( async (req, res) => {
    try {
       
        let user = await User.find()
        if (!user) {
            res.status(400).json({msg:"No users found"})
        }
       
     
        res.json(user)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
 
})
Router.route('/:id').get( async (req, res) => {
    try {
        let id=req.params.id
        let user = await User.findOne({_id:id}).select('-__v')
        .populate('thoughts').populate('friends');
        if (!user) {
            res.status(400).json({msg: "user not found"})
        }
        res.json(user)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
 
})
Router.route('/update/:id').put( async (req, res) => {
    try {
        let id=req.params.id
       
        let user = await User.findOneAndUpdate({_id:id},req.body,{new:true})
        if (!user) {
            res.status(400).json({msg: "user not found"})
        }
        res.json(user)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
 
})
Router.route('/remove/:id').delete( async (req, res) => {
    try {
        let id=req.params.id
       
        let user = await User.findOneAndDelete({_id:id})
        if (!user) {
            res.status(400).json({msg: "user not found"})
        }
        res.json({msg:`${user.userName} is deleted form database`})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
 
})
Router.route('/:userId/friends/:friendId').post( async (req, res) => {
    try {
        let user = await User.findOne({_id:req.params.userId})
        if (!user) {
            res.status(400).json({msg: " user not found"})
        }
       
       
       
     
        await User.updateOne({ _id: req.params.userId}, { $push: { friends:new ObjectId(req.params.friendId) } },{new:true})
       
        res.json({msg:"friend add"})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
 
})
Router.route('/:userId/friends/:friendId').delete( async (req, res) => {
    try {
    
   
          let user = await User.findOne({_id:req.params.userId})
        if (!user) {
            res.status(400).json({msg: " user not found"})
        }
       
       
     
        await User.updateOne({ _id: req.params.userId}, { $pull: { friends:new ObjectId(req.params.friendId) } },{new:true})
       
        res.json({msg:"friend removed"})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
 
})
module.exports = Router;
