// models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // PAYMENT + SUBSCRIPTION DATA
    plan: {
      type: String,
      enum: ["free", "basic", "premium", "vip"],
      default: "free"
    },

    subscriptionStatus: {
      type: String,
      enum: ["pending", "active", "canceled"],
      default: "pending"
    },

    subscriptionId: {
      type: String,
      default: null
    },

    paymentId: {
      type: String,
      default: null
    },

    planExpiry: {
      type: Date,
      default: null
    },

    // 🔵 NEW FIELDS YOU ASKED TO ADD
    planStatus: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "inactive"
    },

    lastPaymentDate: {
      type: Date,
      default: null
    },

    resetToken: { type: String },
    resetTokenExpire: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
