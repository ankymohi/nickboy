import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Pagamento recebido! Confirmando com o banco...");
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const MAX_ATTEMPTS = 20; // Try for 1 minute (20 attempts x 3 seconds)
    
    async function checkPlan() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          throw new Error("Usuário não encontrado");
        }

        const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
        
        console.log(`🔍 Checking plan status (attempt ${attempts + 1})...`);
        
        const res = await fetch(`${API_BASE_URL}/api/users/${user.id}`);
        const data = await res.json();

        console.log("User data:", data);

        if (data.planStatus === "active" && data.plan !== "free") {
          setMessage("✅ Plano ativo! Redirecionando para o dashboard...");
          
          // Update localStorage with new plan
          const updatedUser = { ...user, plan: data.plan, planStatus: data.planStatus };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          
          // Redirect after 2 seconds
          setTimeout(() => navigate("/dashboard"), 2000);
        } else if (attempts < MAX_ATTEMPTS) {
          setMessage(`Processando pagamento... (${attempts + 1}/${MAX_ATTEMPTS})`);
          setAttempts(attempts + 1);
          setTimeout(checkPlan, 3000); // Try again in 3 seconds
        } else {
          setMessage("⚠️ O pagamento está demorando mais que o esperado. Verifique seu email ou contate o suporte.");
        }
      } catch (err) {
        console.error("Error checking plan:", err);
        setMessage("Erro ao verificar plano: " + err.message);
      }
    }

    checkPlan();
  }, [attempts, navigate]);

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
