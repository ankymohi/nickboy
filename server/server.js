// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from "mercadopago";

import authRoutes from "./routes/authRoutes.js";
import bunnyRoutes from "./routes/bunnyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// ------------------------------
// CORS CONFIG
// ------------------------------
const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://nickboy-git-main-mohits-projects-794aad26.vercel.app", // your Vercel frontend
  "https://nickboy.com.br",
  "https://www.nickboy.com.br",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, curl, postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // needed if you use cookies or sessions
  })
);

// ------------------------------
// BODY PARSER
// ------------------------------
app.use(express.json());

// ------------------------------
// ROUTES
// ------------------------------
// Public routes
app.use("/api/auth", authRoutes); // login, register, etc.

// Protected routes (example: admin, images)
app.use("/api/images", bunnyRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/", (req, res) => res.send("API is running 🚀"));

// ------------------------------
// MERCADO PAGO CONFIG
// ------------------------------
const MP_TOKEN = process.env.MP_ACCESS_TOKEN;
if (!MP_TOKEN) {
  console.warn("⚠️ MP_ACCESS_TOKEN not set in .env — Mercado Pago calls will fail.");
}
const client = new MercadoPagoConfig({ accessToken: MP_TOKEN });

// ------------------------------
// CREATE PREFERENCE
// ------------------------------
app.post("/create-preference", async (req, res) => {
  try {
    const { plan } = req.body;
    if (!plan || !plan.name || !plan.price)
      return res.status(400).json({ error: "Invalid plan data" });

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
      metadata: {
        userId: plan.userId,
        planName: plan.name,
      },
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    const prefId = result?.id || result?.body?.id;
    if (!prefId) return res.status(500).json({ error: "No preference id returned" });

    return res.json({ id: prefId });
  } catch (err) {
    console.error("Error creating preference:", err);
    return res.status(500).json({ error: err?.message || "MercadoPago error" });
  }
});

// ------------------------------
// WEBHOOK
// ------------------------------
app.post("/webhook/mercadopago", async (req, res) => {
  try {
    const { data, type } = req.body;
    if (type === "payment") {
      const paymentId = data.id;

      const paymentInfo = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: { Authorization: `Bearer ${MP_TOKEN}` },
        }
      ).then((res) => res.json());

      if (paymentInfo.status === "approved") {
        const userId = paymentInfo.metadata?.userId;
        const planName = paymentInfo.metadata?.planName;

        if (userId) {
          await User.findByIdAndUpdate(userId, {
            plan: planName,
            planStatus: "active",
          });
          console.log("🎉 User Plan Activated:", userId);
        }
      }
    }
    res.status(200).send("OK");
  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(500).send("Webhook Error");
  }
});

// ------------------------------
// MONGO CONNECTION
// ------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ------------------------------
// START SERVER
// ------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
