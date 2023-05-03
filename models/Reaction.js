const {Schema, model} = require('mongoose');
const reactionSchema = new Schema({

    createdAt: {
        type: Date,
        default: Date.now,
        get:formatter
    },

    UserName: {
        type: String,
        require:true


    },
    reactionBody: {
        type: String,
        require:true,
        max:280

    }
}, {
    toJSON: {
        virtuals: true,
        getters:true
    },
    id: false
});

function formatter(time){
    let newTime=new Date(`${time}`)
    return newTime.toString()
  }
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
