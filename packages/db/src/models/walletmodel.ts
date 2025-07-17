import mongoose from "mongoose";

const {Schema} = mongoose;

const walletSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel'
    },
    balance: Number
  })

const WalletModel = mongoose.model('WalletModel', walletSchema);
export default WalletModel
