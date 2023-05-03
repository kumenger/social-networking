const { Schema, model } = require('mongoose');
const userSchema = new Schema(
  {
    thoughts: [
    {  type:Schema.Types.ObjectId,
      ref:"thoughts"
      }
  ],
   
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    userName: {
      type: String,
      unique:true,
      required:[true, 'email required'],
      trim:true,
     
     
    }
  ,
  
    email: {
      type: String,
      require:true,
      unique:true,
      validate: {
        validator: function(v) {
          return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
        },
        message: props => `${props.value} is not a valid email  format!`
      }
  
    },
  
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


userSchema
  .virtual('freindsCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });
  

// Initialize our Post model
const User = model('user', userSchema);

module.exports = User;