const { Schema, model } = require('mongoose');
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reactions',
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
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Post model
const Thought = model('tought', thoughtSchema);

module.exports = Tought;