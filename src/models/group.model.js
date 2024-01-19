import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    transactionArray: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    memberArray: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Group = mongoose.model("Group", groupSchema);
