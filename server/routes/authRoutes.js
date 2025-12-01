import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
import pkg from "sib-api-v3-sdk";

const router = express.Router();
dotenv.config();
const SibApiV3Sdk = pkg;

// Brevo Email Settings
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();
/**
 * 🔹 SIGNUP (supports admin creation)
 */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // ✅ include role in request

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "⚠️ User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      plan: "free",
      role: role || "user", // ✅ allow admin creation if role is sent
    });

    res.status(201).json({
      message: "✅ User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

/**
 * 🔹 LOGIN (supports admin bypass login)
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Hardcoded admin account check
    if (email === "admin@site.com" && password === process.env.ADMIN_PASS) {
      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "✅ Admin login successful",
        token,
        user: { email, role: "admin" },
      });
    }

    // ✅ Normal user login
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "⚠️ User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "❌ Invalid password" });

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role, plan: user.plan },
      process.env.JWT_SECRET || "defaultSecretKey",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "✅ Login successful",
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
});

/**
 * 🔹 UPDATE PLAN
 */
router.put("/update-plan", async (req, res) => {
  try {
    const { userId, plan } = req.body;

    if (!userId || !plan)
      return res.status(400).json({ message: "User ID and plan are required" });

    const user = await User.findByIdAndUpdate(
      userId,
      { plan },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("✅ Plan updated:", user.plan);
    res.status(200).json({
      message: "Plan updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Update plan error:", error.message);
    res.status(500).json({ message: "Error updating plan", error: error.message });
  }
});


/* ---------------------------------------------
  📌 1️⃣ REQUEST RESET PASSWORD LINK
----------------------------------------------*/
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save token hashed in DB
    user.resetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 min

await user.save({ validateBeforeSave: false });

    // URL to send
    const resetURL = `https://www.nickboy.com.br/reset-password/${resetToken}`;

    // EMAIL CONTENT
    const emailData = new SibApiV3Sdk.SendSmtpEmail({
      sender: { email: "himalayastechies@gmail.com", name: "VGD Website" },
      to: [{ email: user.email, name: user.name }],
      subject: "Password Reset Request",
      htmlContent: `
        <h2>Hello ${user.name}</h2>
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetURL}" style="color:blue;">Reset Password</a>
        <br><br>
        <p>This link is valid for 10 minutes.</p>
      `,
    });

    await emailApi.sendTransacEmail(emailData);

    res.json({ success: true, message: "Reset link sent to email." });

  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


/* ---------------------------------------------
  📌 2️⃣ RESET PASSWORD
----------------------------------------------*/
router.post("/reset-password/:token", async (req, res) => {
  try {
    const resetToken = req.params.token;

    // Hash token because DB stores hashed
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpire: { $gt: Date.now() }, // still valid?
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const { password } = req.body;

    // Hash New Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Clear reset fields
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ success: true, message: "Password updated successfully" });

  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * 🔹 UPDATE USER PROFILE
 */
router.put("/update-user/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res.status(200).json({
      message: "✅ Perfil atualizado com sucesso!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error.message);
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
});


export default router;
