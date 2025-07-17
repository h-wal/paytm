import mongoose from "mongoose";

const {Schema} = mongoose;

const transactionSchema = new Schema({
    fromUser: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel'
    },
    toUser: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
      },
    debit: Number,
    credit: Number
  })

const TransactionModel = mongoose.model('TransactionModel', transactionSchema);
export default TransactionModel
