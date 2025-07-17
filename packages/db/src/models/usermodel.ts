import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    userName: {
          type: String
      }, 
    email: {
          type: String
      }, 
    password: {
          type: String
      }, 
    phoneNumber: {
          type: Number
      }, 
    balance: {
          type: Number
    },
    connections: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
      }
    ]
  });

const UserModel = mongoose.model('UserModel', userSchema);
export default UserModel
