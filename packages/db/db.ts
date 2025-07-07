import mongoose, { Mongoose } from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
        type: String,
        required: true
    }, 
  email: {
        type: String,
        required: true
    }, 
  password: {
        type: String,
        required: true
    }, 
  phoneNumber: {
        type: Number,
        required: true
    }, 
  balance: {
        type: Number,
        required: true
  },
  connections: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  ]
});

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;