const {Schema, model} = require('mongoose');
const reactionSchema = new Schema({

    createdAt: {
        type: Date,
        default: Date.now
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
        virtuals: true
    },
    id: false
});

function formatter(time){
    return 
  }
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
