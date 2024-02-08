import mongoose, { Schema, models } from "mongoose";

const finalTransactionListSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },

  receiver: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    default: 0,
  },
});

const transactionSchema = new Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    transactionName: {
      type: String,
      required: true,
    },
    memberArray: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    finalTransactionList: [finalTransactionListSchema],
  },
  {
    timestamps: true,
  }
);

export const Transaction =
  models.Transaction || mongoose.model("Transaction", transactionSchema);
