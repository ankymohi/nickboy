import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, ShieldCheck, Loader2, AlertCircle } from "lucide-react";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // -----------------------------
  // 🔥 FIXED: Plans MUST be above useEffect
  // -----------------------------
  const plans = [
    {
      name: "Pack 1",
      price: "49.99",
      originalPrice: "49.99",
      duration: "Acesso único",
      features: ["100 fotos", "Todas as mídias em Full HD"],
      popular: false,
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Pack 2",
      price: "99.99",
      originalPrice: "99.99",
      duration: "Acesso único",
      features: ["150 fotos", "25 vídeos", "Todas as mídias em Full HD"],
      popular: true,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Pack 3",
      price: "300.00",
      originalPrice: "300.00",
      duration: "Acesso único + VIP",
      features: [
        "150 fotos",
        "50 vídeos",
        "1 vídeo personalidade",
        "Todas as mídias em Full HD"
      ],
      popular: false,
      color: "from-amber-500 to-orange-500"
    }
  ];

  // Promo prices override
  const promoPrices = {
    "Pack 1": { price: "29.99", originalPrice: "49.99" },
    "Pack 2": { price: "69.99", originalPrice: "99.99" },
    "Pack 3": { price: "209.99", originalPrice: "299.99" }
  };

  // ------------------------------------------------------
  // Load user and plan from navigation
  // ------------------------------------------------------
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);

      if (location.state?.plan) {
        const planName = location.state.plan.trim();
        const planData = plans.find(
          (p) => p.name.toLowerCase() === planName.toLowerCase()
        );

        if (planData) {
          // apply promo override
          const promo = promoPrices[planData.name];
          if (promo) {
            planData.price = promo.price;
            planData.originalPrice = promo.originalPrice;
          }
          setSelectedPlan({ ...planData });
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, [location.state]);

  // ------------------------------------------------------
  // Select a plan
  // ------------------------------------------------------
  const handleSelectPlan = (plan) => {
    if (!user) {
      alert("Por favor, faça login primeiro!");
      navigate("/login");
      return;
    }

    // apply promo
    const promo = promoPrices[plan.name];
    if (promo) {
      plan = { ...plan, price: promo.price, originalPrice: promo.originalPrice };
    }

    setSelectedPlan(plan);
    handleConfirmPayment(plan);
  };

  // ------------------------------------------------------
  // Confirm payment + redirect to MercadoPago
  // ------------------------------------------------------
  const handleConfirmPayment = async (plan = selectedPlan) => {
    if (!plan) {
      alert("Selecione um plano primeiro.");
      return;
    }

    if (!user) {
      alert("Por favor, faça login primeiro!");
      navigate("/login");
      return;
    }

    setIsProcessing(true);

    try {
      // 🔥 FIX: Dynamic backend URL (works in production)
      const backendUrl =
        process.env.REACT_APP_BACKEND_URL || "https://your-backend-url.com";

      const response = await fetch(`${backendUrl}/create-preference`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (!response.ok || !data.id) {
        console.error("Create preference failed:", data);
        alert("Erro ao iniciar o pagamento. Tente novamente.");
        setIsProcessing(false);
        return;
      }

      // 🔥 FIX: Always redirect with NEW preference id
      window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${data.id}`;
    } catch (err) {
      console.error("Erro de pagamento:", err);
      alert("Erro ao conectar com o servidor de pagamento.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ------------------------------------------------------
  // SAFE discount calc (avoids division by zero)
  // ------------------------------------------------------
  const discountPercent = (plan) => {
    const orig = parseFloat(plan.originalPrice);
    const price = parseFloat(plan.price);
    if (orig > 0) {
      return Math.round(((orig - price) / orig) * 100);
    }
    return 0;
  };

  // ------------------------------------------------------
  // UI
  // ------------------------------------------------------
  return (
    <div style={{ minHeight: "100vh", color: "#fff" }}>
      {/* Header */}
      <div
        style={{
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "16px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#fff",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ← Voltar
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldCheck size={20} style={{ color: "#4ade80" }} />
            <span style={{ fontSize: "14px" }}>Pagamento Seguro</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "48px 16px",
        }}
      >
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "16px",
              background: "linear-gradient(to right, #fff, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Escolha Seu Pack
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#d1d5db" }}>
            Acesso imediato após confirmação do pagamento
          </p>
        </div>

        {/* Plans */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          {plans.map((plan, index) => {
            const promo = promoPrices[plan.name];
            const price = promo ? promo.price : plan.price;
            const original = promo ? promo.originalPrice : plan.originalPrice;

            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(16px)",
                  borderRadius: "16px",
                  padding: "32px",
                  border: plan.popular
                    ? "2px solid #a855f7"
                    : "1px solid rgba(255,255,255,0.1)",
                  transform: plan.popular ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
              >
                {plan.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-16px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(to right, #a855f7, #ec4899)",
                      padding: "8px 24px",
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    ⭐ MAIS POPULAR
                  </div>
                )}

                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {plan.name}
                  </h3>
                  <p style={{ color: "#9ca3af", fontSize: "14px" }}>
                    {plan.duration}
                  </p>

                  {/* Prices */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        color: "#9ca3af",
                        textDecoration: "line-through",
                        fontSize: "1.125rem",
                      }}
                    >
                      R$ {original}
                    </span>
                    <span
                      style={{
                        fontSize: "2.25rem",
                        fontWeight: "bold",
                      }}
                    >
                      R$ {price}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      background: "rgba(34, 197, 94, 0.2)",
                      color: "#4ade80",
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Economize {discountPercent({ originalPrice: original, price })}
                    %
                  </div>
                </div>

                {/* Features */}
                <ul style={{ marginBottom: "32px", listStyle: "none", padding: 0 }}>
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "12px",
                        color: "#d1d5db",
                      }}
                    >
                      <Check size={20} style={{ color: "#4ade80" }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isProcessing}
                  style={{
                    width: "100%",
                    background: `linear-gradient(to right, ${
                      plan.color.includes("blue")
                        ? "#3b82f6, #2563eb"
                        : plan.color.includes("purple")
                        ? "#a855f7, #ec4899"
                        : "#f59e0b, #f97316"
                    })`,
                    color: "#fff",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "none",
                    fontWeight: "bold",
                    fontSize: "1.125rem",
                    cursor: "pointer",
                    opacity: isProcessing ? 0.5 : 1,
                  }}
                >
                  {isProcessing ? "Processando..." : "Assinar Agora"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
