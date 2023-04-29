const { Schema, model } = require('mongoose');
const toughtSchema = new Schema(
  {
    toughtText: {
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
toughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Post model
const Tought = model('tought', toughtSchema);

module.exports = Tought;