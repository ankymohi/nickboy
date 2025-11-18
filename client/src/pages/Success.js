import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Pagamento recebido! Confirmando com o banco...");

  useEffect(() => {
    async function checkPlan() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) throw new Error("Usuário não encontrado no localStorage");

        // Replace with your backend API URL
        const API_BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(/\/$/, "");
        const res = await fetch(`${API_BASE_URL}/api/users/${user._id}`);
        const data = await res.json();

        if (data.planStatus === "active") {
          setMessage("Plano ativo! Redirecionando para o dashboard 📲");
          setTimeout(() => navigate("/dashboard"), 2000);
        } else {
          setMessage("Pagamento confirmado, mas o plano ainda está sendo processado. Aguarde...");
          // Poll again after 3 seconds
          setTimeout(checkPlan, 3000);
        }
      } catch (err) {
        setMessage("Erro ao verificar plano: " + err.message);
      }
    }

    checkPlan();
  }, [navigate]);

  return (
    <div style={{ padding: 24, fontSize: 18 }}>
      {message}
    </div>
  );
}
