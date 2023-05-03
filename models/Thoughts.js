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
        ref: 'reaction',
      },
    ],
    userName:{
      type: String,
      required:true
  
    },
  },
  {
    toJSON: {
      virtuals: true,
       getters: true 
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
  let newTime=new Date(`${time}`)
  return newTime.toString()
}
const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;