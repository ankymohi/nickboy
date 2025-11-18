import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
  setTimeout(() => {
    navigate("/dashboard"); // always redirect after 4 seconds
  }, 4000);
}, [navigate]);


  return (
    <div style={{ padding: 24 }}>
  Pagamento recebido!<br />
  Confirmando com o banco...<br />
  Redirecionando para o dashboard 📲
</div>

  );
}
