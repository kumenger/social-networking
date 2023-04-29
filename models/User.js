const { Schema, model } = require('mongoose');
const userSchema = new Schema(
  {
    toughts: [
    {  type:Schema.Types.ObjectId,
      ref:"Toughts"
      }
  ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    UserName: {
      type: String,
  
    },
    email: {
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
userSchema
  .virtual('freindsCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our Post model
const User = model('user', userSchema);

module.exports = User;