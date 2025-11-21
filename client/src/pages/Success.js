import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Pagamento recebido! Confirmando com o banco...");
  const [attempts, setAttempts] = useState(0);

  // Try to read external_reference (works for CARD)
const urlParams = new URLSearchParams(window.location.search);
let externalRef = urlParams.get("external_reference");

let userId = null;
let planName = null;

try {
  if (externalRef) {
    const parsed = JSON.parse(externalRef);
    userId = parsed.userId;
    planName = parsed.planName;
  }
} catch (e) {
  console.error("❌ Failed to parse external_reference", e);
}

// PIX fallback → MP does NOT send external_reference on PIX
if (!userId) {
  const localUser = JSON.parse(localStorage.getItem("user"));
  userId = localUser?._id;
  planName = localUser?.plan;
}


  useEffect(() => {
    const MAX_ATTEMPTS = 20; // 1 minute polling
    
    async function checkPlan() {
      try {
        // ❌ STOP using localStorage → it is empty after redirect
        if (!userId) {
          setMessage("Erro: userId não encontrado no pagamento.");
          return;
        }

        const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

        console.log(`🔍 Checking plan status for: ${userId} (attempt ${attempts + 1})`);

        const res = await fetch(`${API_BASE_URL}/api/users/${userId}`);
        const data = await res.json();

        console.log("User data:", data);

        if (data.planStatus === "active" && data.plan !== "free") {
          setMessage("✅ Plano ativo! Redirecionando para o dashboard...");

          // Optional: update localStorage
          localStorage.setItem("user", JSON.stringify(data));

          // Redirect after 2 seconds
          setTimeout(() => navigate("/dashboard"), 2000);
          return;
        }

        // Retry until MAX_ATTEMPTS
        if (attempts < MAX_ATTEMPTS) {
          setMessage(`Processando pagamento... (${attempts + 1}/${MAX_ATTEMPTS})`);
          setAttempts(attempts + 1);
          setTimeout(checkPlan, 3000);
        } else {
          setMessage("⚠️ O pagamento está demorando mais que o esperado. Verifique seu email ou contate o suporte.");
        }

      } catch (err) {
        console.error("Error checking plan:", err);
        setMessage("Erro ao verificar plano: " + err.message);
      }
    }

    checkPlan();
  }, [attempts, navigate, userId]);

  return (
    <div style={{ 
      padding: 48, 
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '48px',
        maxWidth: '500px'
      }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
        <h1 style={{ fontSize: 32, marginBottom: 16 }}>Pagamento Confirmado!</h1>
        <p style={{ fontSize: 18, marginBottom: 24 }}>{message}</p>
        <div style={{ 
          width: '100%', 
          height: '4px', 
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(attempts / 20) * 100}%`,
            height: '100%',
            background: 'white',
            transition: 'width 0.3s ease'
          }}/>
        </div>
      </div>
    </div>
  );
}
