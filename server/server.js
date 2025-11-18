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
// ✅ FIXED CORS (ONLY THIS ONE)
// ------------------------------
const allowedOrigins = [
  "https://agenciavgd.vercel.app",
  "https://agenciavgd-xy81.vercel.app",
  "https://agenciavgd-anwr.vercel.app",

  // ✅ ADD THESE TWO
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

app.use(express.json());

// ------------------------------
// ROUTES
// ------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/images", bunnyRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("API is running successfully 🚀"));

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

    if (!plan || !plan.name || !plan.price) {
      return res.status(400).json({ error: "Invalid plan data" });
    }

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

  // 🔹 ADD THIS
  metadata: {
    userId: plan.userId,
    planName: plan.name,
  },
};


    const preference = new Preference(client);
    const result = await preference.create({ body });

    const prefId = result?.id || result?.body?.id;
    if (!prefId) {
      console.error("No preference id returned from Mercado Pago:", result);
      return res.status(500).json({ error: "No preference id returned from MP" });
    }

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
  console.log("🔔 Webhook received:", req.body);

  try {
    const { data, type } = req.body;

    if (type === "payment") {
      const paymentId = data.id;

      const paymentInfo = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: { Authorization: `Bearer ${MP_TOKEN}` }
        }
      ).then(res => res.json());

      console.log("Payment Info:", paymentInfo);

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
  } catch (error) {
    console.error("Webhook Error:", error);
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