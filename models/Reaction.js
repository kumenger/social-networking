const {Schema, model} = require('mongoose');
const reactionSchema = new Schema({

    createdAt: {
        type: Date,
        default: Date.now
    },

    UserName: {
        type: String

    },
    reactionBody: {
        type: String

    }
}, {
    toJSON: {
        virtuals: true
    },
    id: false
});


const Reactions = model('reaction', reactionSchema);

module.exports = Reactions;
