import mongoose, { Schema } from "mongoose";

const paymentArraySchema = new Schema({
  amountPaid: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
    paymentArray: [paymentArraySchema],
  },
  {
    timestamps: true,
  }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
