import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import validator from 'validator'

const UserSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(v) {
         if(!validator.isEmail(v)) {
             throw new Error('Please provide a valid email')
         }
     }
  },
	firstname: {
      type: String,
      required: true,
      trim: true
  },
   lastname: {
      type: String,
      required: true,
      trim: true
   },
	password: {
      type: String,
      trim: true
  },
  challenge: [
     {
        opponentName: String,
        opponentEmail: String,
        gameId: String,
        isWhite: Boolean
     }
  ]
})

UserSchema.plugin(passportLocalMongoose, { usernameField : 'email' });
const User = mongoose.model("User", UserSchema);

module.exports = User