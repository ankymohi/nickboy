import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, ShieldCheck, Loader2, AlertCircle } from "lucide-react";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
const promoPrices = {
  "Pack 1": { price: "29.99", originalPrice: "49.99" },
  "Pack 2": { price: "69.99", originalPrice: "99.99" },
  "Pack 3": { price: "209.99", originalPrice: "299.99" },
};

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);

      if (location.state?.plan) {
        const planName = location.state.plan.toLowerCase().replace("pack ", "pack");
        const planData = plans.find(p => p.name.toLowerCase() === planName.toLowerCase());
        if (planData) {
          setSelectedPlan(planData);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, [location.state]);

 const plans = [
  {
    name: "Pack 1",
    price: "1.00",
    originalPrice: "0",
    duration: "Acesso único",
    features: [
      "100 fotos",
      "Todas as mídias em Full HD",
    ],
    popular: false,
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Pack 2",
    price: "99.99",
    originalPrice: "0",
    duration: "Acesso único",
    features: [
      "150 fotos",
      "25 vídeos",
      "Todas as mídias em Full HD",
    ],
    popular: true,
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Pack 3",
    price: "300.00",
    originalPrice: "0",
    duration: "Acesso único + VIP",
    features: [
      "150 fotos",
      "50 vídeos",
      "1 vídeo personalidade",
      "Todas as mídias em Full HD",
    ],
    popular: false,
    color: "from-amber-500 to-orange-500"
  }
];


  const handleSelectPlan = (plan) => {
    if (!user) {
      alert("Por favor, faça login primeiro!");
      navigate("/login");
      return;
    }
    setSelectedPlan(plan);
    handleConfirmPayment(plan);
  };

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
    const response = await fetch("https://nickboy.onrender.com/create-preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        plan: plan,
        userId: user.id || user._id  // ✅ ADD THIS - send user ID
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Create preference failed:", data);
      alert("Erro ao iniciar o pagamento. Veja console.");
      setIsProcessing(false);
      return;
    }

    if (data.id) {
      // ✅ Store payment info in localStorage for success page
      localStorage.setItem('pendingPayment', JSON.stringify({
        planName: plan.name,
        userId: user.id || user._id,
        timestamp: Date.now()
      }));
      
      window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${data.id}`;
      return;
    } else {
      console.error("No preference id returned:", data);
      alert("Erro ao iniciar o pagamento. Sem preference id.");
    }
  } catch (err) {
    console.error("Erro ao conectar com o servidor de pagamento:", err);
    alert("Erro ao conectar com o servidor de pagamento!");
  } finally {
    setIsProcessing(false);
  }
};



  return (
    <div style={{
      minHeight: '100vh',
      color: '#fff'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '16px 0'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#fff',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'color 0.3s'
            }}
          >
            ← Voltar
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} style={{ color: '#4ade80' }} />
            <span style={{ fontSize: '14px' }}>Pagamento Seguro</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '48px 16px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '16px',
            background: 'linear-gradient(to right, #fff, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Escolha Seu Pack
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#d1d5db' }}>
            Acesso imediato após confirmação do pagamento
          </p>
        </div>

        {/* Plans Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          {plans.map((plan, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px)',
                borderRadius: '16px',
                padding: '32px',
                border: plan.popular ? '2px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.1)',
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(to right, #a855f7, #ec4899)',
                  padding: '8px 24px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  boxShadow: '0 10px 25px rgba(168, 85, 247, 0.5)'
                }}>
                  ⭐ MAIS POPULAR
                </div>
              )}

              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
                  {plan.name}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '16px' }}>
                  {plan.duration}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ color: '#9ca3af', textDecoration: 'line-through', fontSize: '1.125rem' }}>
                    R$ {plan.originalPrice}
                  </span>
                  <span style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>
                    R$ {plan.price}
                  </span>
                </div>
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(34, 197, 94, 0.2)',
                  color: '#4ade80',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  Economize {Math.round(((parseFloat(plan.originalPrice) - parseFloat(plan.price)) / parseFloat(plan.originalPrice)) * 100)}%
                </div>
              </div>

              <ul style={{ marginBottom: '32px', listStyle: 'none', padding: 0 }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginBottom: '12px',
                    color: '#d1d5db'
                  }}>
                    <Check size={20} style={{ color: '#4ade80', flexShrink: 0, marginTop: '2px' }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan)}
                disabled={isProcessing}
                style={{
                  width: '100%',
                  background: `linear-gradient(to right, ${plan.color.includes('blue') ? '#3b82f6, #2563eb' : plan.color.includes('purple') ? '#a855f7, #ec4899' : '#f59e0b, #f97316'})`,
                  color: '#fff',
                  padding: '16px',
                  borderRadius: '12px',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '1.125rem',
                  cursor: 'pointer',
                  opacity: isProcessing ? 0.5 : 1,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)'
                }}
              >
                {isProcessing ? "Processando..." : "Assinar Agora"}
              </button>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {[
            { icon: ShieldCheck, color: '#4ade80', title: '100% Seguro', desc: 'Pagamento protegido e criptografado' },
            { icon: Loader2, color: '#60a5fa', title: 'Acesso Imediato', desc: 'Receba seu conteúdo instantaneamente' },
            { icon: AlertCircle, color: '#c084fc', title: 'Suporte 24/7', desc: 'Estamos aqui para ajudar sempre' }
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <item.icon size={48} style={{ color: item.color, margin: '0 auto 12px' }} />
              <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>{item.title}</h4>
              <p style={{ color: '#9ca3af', fontSize: '14px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
