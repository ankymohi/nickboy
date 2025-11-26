import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from "mercadopago";
import multer from "multer";
import fs from "fs";
import authRoutes from "./routes/authRoutes.js";
import bunnyRoutes from "./routes/bunnyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import User from "./models/userModel.js"; // ✅ ADD THIS LINE
import nodemailer from "nodemailer";
import formRoute from "./routes/formRoute.js";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

dotenv.config();
const app = express();

// CORS Config (your existing code is fine)
const allowedOrigins = [
  "https://agenciavgd.vercel.app",
  "https://agenciavgd-xy81.vercel.app",
  "https://agenciavgd-anwr.vercel.app",
  "https://nickboy.com.br",
  "https://www.nickboy.com.br",
  "http://localhost:3000"
];



app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// For JSON + form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer for files
const upload = multer({ dest: "uploads/" });

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ak8628041311@gmail.com",
    pass: "ednd ovxu rbjc zfly",
  },
});

// ✅ FIXED: using app.post (NOT router.post)
app.post("/send-form", upload.any(), async (req, res) => {
  try {
    const fields = req.body;
    const files = req.files;

    let message = "";
    for (let key in fields) {
      message += `${key}: ${fields[key]}\n`;
    }

    const attachments = files.map((file) => ({
      filename: file.originalname,
      path: file.path,
    }));

    await transporter.sendMail({
      from: "ak8628041311@gmail.com",
      to: "himalayastechies@gmail.com",
      subject: "New Form Submission - VGD Agency",
      text: message,
      attachments: attachments,
    });

    // delete temp uploaded files
    files.forEach((file) => fs.unlinkSync(file.path));

    res.json({ success: true, msg: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});




// Routes
app.use("/api/auth", authRoutes);
app.use("/api/images", bunnyRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("API is running successfully 🚀"));

// Mercado Pago Config
const MP_TOKEN = process.env.MP_ACCESS_TOKEN;
if (!MP_TOKEN) {
  console.warn("⚠️ MP_ACCESS_TOKEN not set in .env");
}

const client = new MercadoPagoConfig({ accessToken: MP_TOKEN });

// ============================================
// 2️⃣ FIX: CREATE PREFERENCE - ADD NOTIFICATION URL & USER ID
// ============================================
app.post("/create-preference", async (req, res) => {
  try {
    const { plan, userId } = req.body; // ✅ ADD userId

    if (!plan || !plan.name || !plan.price) {
      return res.status(400).json({ error: "Invalid plan data" });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // ✅ YOUR BACKEND URL - CHANGE THIS TO YOUR DEPLOYED URL
   const BACKEND_URL = "https://nickboy.onrender.com";  // FIXED


    const body = {
      items: [
        {
          title: plan.name,
          quantity: 1,
          currency_id: "BRL",
          unit_price: parseFloat(plan.price),
        },
      ],
      back_urls: {
        success: "https://www.nickboy.com.br/payment-success",
        failure: "https://www.nickboy.com.br/payment-failure",
        pending: "https://www.nickboy.com.br/payment-pending",
      },
      auto_return: "approved",
      
      // ✅ CRITICAL: Add notification URL for webhook
      notification_url: `https://nickboy.onrender.com/webhook/mercadopago`,

      
      // ✅ Store user and plan info
      metadata: {
        userId: userId,
        planName: plan.name,
      },
      
      // ✅ Alternative: use external_reference
      external_reference: JSON.stringify({
        userId: userId,
        planName: plan.name
      })
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    const prefId = result?.id || result?.body?.id;
    if (!prefId) {
      console.error("No preference id returned from Mercado Pago:", result);
      return res.status(500).json({ error: "No preference id returned from MP" });
    }

    console.log("✅ Preference created for user:", userId, "Plan:", plan.name);
    return res.json({
  id: prefId,
  init_point: result.init_point || result.body?.init_point,
  sandbox_init_point: result.sandbox_init_point || result.body?.sandbox_init_point
});

  } catch (err) {
    console.error("Error creating preference:", err);
    return res.status(500).json({ error: err?.message || "MercadoPago error" });
  }
});

// ============================================
// 3️⃣ FIX: WEBHOOK - PROPERLY UPDATE USER PLAN
// ============================================
app.post("/webhook/mercadopago", async (req, res) => {
  console.log("🔔 Webhook received:", JSON.stringify(req.body, null, 2));

  // ✅ Always respond 200 immediately to Mercado Pago
  res.status(200).send("OK");

  try {
    const { data, type } = req.body;

    // Only process payment notifications
    if (type === "payment") {
      const paymentId = data.id;
      console.log("💳 Processing payment ID:", paymentId);

      // Fetch full payment details from Mercado Pago
      const paymentResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: { Authorization: `Bearer ${MP_TOKEN}` }
        }
      );

      const paymentInfo = await paymentResponse.json();
      console.log("📄 Payment Info:", JSON.stringify(paymentInfo, null, 2));

      // ✅ Check if payment is approved
      if (paymentInfo.status === "approved") {
        // Try to get userId from metadata first, then external_reference
        let userId = paymentInfo.metadata?.user_id || paymentInfo.metadata?.userId;
        let planName = paymentInfo.metadata?.plan_name || paymentInfo.metadata?.planName;

        // If not in metadata, try external_reference
        if (!userId && paymentInfo.external_reference) {
          try {
            const refData = JSON.parse(paymentInfo.external_reference);
            userId = refData.userId;
            planName = refData.planName;
          } catch (e) {
            console.error("Error parsing external_reference:", e);
          }
        }

        console.log("👤 Extracted - UserId:", userId, "Plan:", planName);

        if (userId) {
          // ✅ Update user in database
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
              plan: planName,
              planStatus: "active",
              paymentId: paymentId,
              lastPaymentDate: new Date()
            },
            { new: true }
          );

          if (updatedUser) {
            console.log("🎉 SUCCESS! User plan activated:", {
              userId: updatedUser._id,
              plan: updatedUser.plan,
              planStatus: updatedUser.planStatus
            });
          } else {
            console.error("❌ User not found with ID:", userId);
          }
        } else {
          console.error("❌ No userId found in payment metadata or external_reference");
        }
      } else {
        console.log("⏳ Payment not approved yet. Status:", paymentInfo.status);
      }
    }
  } catch (error) {
    console.error("❌ Webhook Error:", error);
  }
});

// ============================================
// 4️⃣ NEW: GET USER ENDPOINT (for success page polling)
// ============================================
app.get("/api/users/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      plan: user.plan,
      planStatus: user.planStatus
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

