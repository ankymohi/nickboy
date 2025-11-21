import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PromoCheckout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [promoPlan, setPromoPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);
console.log("localStorage keys:", Object.keys(localStorage));
console.log("User from localStorage:", localStorage.getItem("user"));

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      alert("Você precisa estar logado para acessar esta promoção.");
      navigate("/login");
      return;
    }

    // Validate incoming promotion data
    if (!location.state?.plan || !location.state?.promoPrice) {
      alert("Promoção inválida ou expirada.");
      navigate("/dashboard");
      return;
    }

    const planName = location.state.plan;
    const promoPrice = location.state.promoPrice;

    const planData = {
      name: planName,
      price: promoPrice,
      originalPrice: location.state.originalPrice || null,
      duration: "Acesso único",
      features: ["Conteúdo Premium", "Atualizações incluídas", "Entrega imediata"],
    };

    setPromoPlan(planData);

    // Auto-start payment
    startPayment(planData, user.id);
  }, [location.state, navigate]);

  const startPayment = async (plan, userId) => {
    try {
      setIsProcessing(true);

      const response = await fetch("https://nickboy.onrender.com/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, userId }), // send userId to backend
      });

      const data = await response.json();

      if (!response.ok || !data.id) {
        alert("Erro ao iniciar pagamento da promoção.");
        console.error("MercadoPago error:", data);
        setIsProcessing(false);
        return;
      }

      // Redirect user to MercadoPago checkout
      window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${data.id}`;
    } catch (err) {
      console.error(err);
      alert("Falha ao conectar ao servidor.");
      setIsProcessing(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        textAlign: "center",
      }}
    >
      <div>
        <h2 style={{ fontSize: "28px", marginBottom: 20 }}>
          Processando promoção...
        </h2>

        {promoPlan && (
          <>
            <p style={{ fontSize: "20px", marginBottom: 10 }}>
              Plano: <strong>{promoPlan.name}</strong>
            </p>
            <p style={{ fontSize: "22px", marginBottom: 20 }}>
              Preço Promocional:{" "}
              <strong style={{ color: "#4ade80" }}>R$ {promoPlan.price}</strong>
            </p>
          </>
        )}

        {isProcessing && <p>Aguarde, você será redirecionado...</p>}
      </div>
    </div>
  );
}
