const { Schema, model } = require('mongoose');
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required:true,
      min:1,
      max:280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get:formatter
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
    UserName: {
      type: String,
  
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `tagCount` that gets the amount of comments per user
thoughtSchema .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

function formatter(time){
  return 
}
const Thought = model('tought', thoughtSchema);

module.exports = Tought;