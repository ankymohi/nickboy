import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Crown,
  Download,
  Play,
  Lock,
  Star,
  Calendar,
  TrendingUp,
  Heart,
  User,
  Settings,
  LogOut,
  Search,
  Filter,
  Grid,
  List,
} from "lucide-react";
import "../Dashboard.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function SubscriberDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [likedItems, setLikedItems] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPromo, setShowPromo] = useState(false);
  const [promoDismissed, setPromoDismissed] = useState(false);
  const [topBarDismissed, setTopBarDismissed] = useState(false);

  // ✅ Get user first
  const user = JSON.parse(localStorage.getItem("user"));
  const plan = user?.plan?.toLowerCase() || "basic"; // fallback to 'basic' if not fou
const navigate = useNavigate();

// 🎯 MOVE PROMO HERE (before useEffect!)
const planName = user?.plan?.toLowerCase() || "";

const isPack1 = planName.includes("1");
const isPack2 = planName.includes("2");

const promo = isPack1
  ? {
      title: "Oferta Especial!",
      text: "Atualize para o Pack 2 com 30% de desconto!",
      price: "1",
      button: "Atualizar agora",
      action: () =>
  navigate("/promo-checkout", {
    state: {
      plan: "Pack 2",
      promoPrice: "1",
      originalPrice: "99.99"
    }
  })

    }
  : isPack2
  ? {
      title: "Oferta Exclusiva!",
      text: "Atualize para o Pack 3 com 30% de desconto!",
      price: "209.99",
      button: "Ir para Pack 3",
      action: () =>
  navigate("/promo-checkout", {
    state: {
      plan: "Pack 3",
      promoPrice: "209.99",
      originalPrice: "299.99"
    }
  })

    }
  : null;



// 🎯 Show promo only once after 4 seconds if not dismissed
useEffect(() => {
  if (!promo || promoDismissed) return;

  const timer = setTimeout(() => {
    setShowPromo(true);
  }, 4000);

  return () => clearTimeout(timer);
}, [promo, promoDismissed]);
  // ✅ CDN URL
  const CDN_BASE_URL = `https://imagesadult.b-cdn.net/${plan}/`;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/images/${plan}`)
      .then((res) => setImages(res.data))
      .catch((err) => console.error("Error loading images:", err));
  }, [plan]);

  const [userInfo, setUserInfo] = useState({
    name: "Usuário",
    email: "usuario@email.com",
    plan: "Nenhum Plano",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const planName = user.plan
        ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1)
        : "Nenhum Plano";

      setUserInfo({
        name: user.name || "Usuário",
        email: user.email || "usuario@email.com",
        plan: planName,
      });
    }
  }, []);

  

  const [planInfo, setPlanInfo] = useState({
    name: "Nenhum Plano",
    status: "Inativo",
    validUntil: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.plan) {
      let planName = user.plan.charAt(0).toUpperCase() + user.plan.slice(1);
      let validity = new Date();
      validity.setFullYear(validity.getFullYear() + 1);

      setPlanInfo({
        name: `Plano ${planName}`,
        status: "Ativo ✅",
        validUntil: validity.toLocaleDateString("pt-BR"),
      });
    } else {
      setPlanInfo({
        name: "Nenhum Plano",
        status: "Inativo ❌",
        validUntil: null,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const userPlan = {
    name: "Premium",
    tier: "premium",
    expiryDate: "2025-12-30",
    mediaAccess: 70,
    mediaViewed: 45,
  };

  const mediaContent = images.map((img, index) => ({
    id: index + 1,
    type: "photo",
    title: img.name,
    date: new Date().toISOString(),
    locked: false,
    thumbnail: `${CDN_BASE_URL}${img.name}`,
    views: Math.floor(Math.random() * 500) + 50,
  }));

  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredContent = mediaContent.filter((item) => {
    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (activeTab === "all") return true;
    if (activeTab === "photos") return item.type === "photo";
    if (activeTab === "videos") return item.type === "video";
    if (activeTab === "favorites") return likedItems.includes(item.id);
    return true;
  });

  // Pagination setup
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContent.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);

  if (!user || user.plan === "free") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Background Circles */}
        <div
          style={{
            position: "fixed",
            top: "80px",
            left: "40px",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent)",
            borderRadius: "50%",
            filter: "blur(60px)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        ></div>
        <div
          style={{
            position: "fixed",
            top: "160px",
            right: "40px",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent)",
            borderRadius: "50%",
            filter: "blur(60px)",
            animation: "pulse 4s ease-in-out infinite 1s",
          }}
        ></div>

        {/* Content Container */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "40px 20px",
            textAlign: "center",
          }}
        >
          {/* Lock Icon */}
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "30px",
              animation: "bounce 3s ease-in-out infinite",
            }}
          >
            <img src={logo} alt="VGD Logo" />
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(2rem, 8vw, 4.5rem)",
              fontWeight: "bold",
              marginBottom: "20px",
              background:
                "linear-gradient(90deg, rgb(153 17 27), rgb(228 193 153), rgb(210 19 37))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Pronto pra ver sem censura?
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              color: "#d1d5db",
              marginBottom: "15px",
              maxWidth: "600px",
            }}
          >
           Desbloqueie um mundo de conteúdo premium exclusivo.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              color: "#9ca3af",
              marginBottom: "40px",
            }}
          >
            <TrendingUp size={16} style={{ color: "#ec4899" }} />
            <span>Junte-se a mais de 10.000 assinantes premium</span>
          </div>

        
          {/* CTA Button */}
          <button
            onClick={() => navigate("/CheckoutPage")}
            style={{
              background:
                "linear-gradient(90deg, rgb(153 17 27), rgb(228 193 153), rgb(210 19 37))",
              color: "#fff",
              border: "none",
              padding: "18px 48px",
              borderRadius: "50px",
              fontSize: "18px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 10px 40px rgba(236, 72, 153, 0.4)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.boxShadow =
                "0 15px 50px rgba(236, 72, 153, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 10px 40px rgba(236, 72, 153, 0.4)";
            }}
          >
            <Crown size={24} />
            Liberar meus packs +18 agora
            <Star size={24} />
          </button>

          <p
            style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "30px" }}
          >
            🔒 Pagamento seguro • Cancele quando quiser • Sem taxas ocultas
          </p>

          {/* Trust Badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "30px",
              justifyContent: "center",
              fontSize: "13px",
              color: "#9ca3af",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#10b981" }}>✓</span>
              <span>Criptografia SSL</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#10b981" }}>✓</span>
              <span>Garantia de reembolso</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#10b981" }}>✓</span>
              <span>Suporte 24 horas por dia, 7 dias por semana</span>
            </div>
          </div>
        </div>

        {/* CSS Animation */}
        <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-header-left">
            <div className="dashboard-logo">
              <img src={logo} alt="VGD Logo" />
            </div>
            <div>
              <p className="dashboard-subtitle">Área do Assinante</p>
            </div>
          </div>

          <div className="dashboard-header-right">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="icon-button"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="icon-button"
            >
              <Settings size={20} />
            </button>
            <div className="profile-dropdown-wrapper">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="profile-avatar"
              >
                <User size={20} />
              </button>

              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <div className="profile-dropdown-info">
                      <div className="profile-dropdown-avatar">
                        <User size={24} />
                      </div>
                      <div>
                        <p className="profile-dropdown-name">{userInfo.name}</p>
                        <p className="profile-dropdown-email">
                          {userInfo.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="profile-dropdown-menu">
                    <button
                      className="profile-dropdown-item"
                      onClick={() => setShowSettings(true)}
                    >
                      <User size={16} />
                      <span>Meu Perfil</span>
                    </button>
                    <button
                      className="profile-dropdown-item"
                      onClick={() => {
                        setShowSettings(false);
                        navigate("/CheckoutPage");
                      }}
                    >
                      <Crown size={16} />
                      <span>Minha Assinatura</span>
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="profile-dropdown-item"
                    >
                      <Settings size={16} />
                      <span>Configurações</span>
                    </button>
                    <div className="profile-dropdown-divider"></div>
                    <button onClick={handleLogout} className="logout-button">
                      <LogOut size={20} />
                      <span>Sair da Conta</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showSearch && (
          <div className="search-bar-wrapper">
            <div className="search-bar-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar conteúdo..."
                className="search-input"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="search-clear"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ⚡ TOP BAR - Always show if promo exists and not dismissed */}
      {promo && !topBarDismissed && (

        <div
          style={{
            position: "relative",
            zIndex: 10,
            background: "linear-gradient(90deg,#ff006a,#ff8a00)",
            color: "white",
            padding: "10px 12px",
            fontSize: "15px",
            textAlign: "center",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <span>🎁 Oferta rápida: {promo.text}</span>
         <button onClick={promo.action}

            style={{
              background: "white",
              color: "#ff006a",
              border: "none",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Ver Oferta
          </button>
         <button
  onClick={() => setTopBarDismissed(true)}

            style={{
              position: "absolute",
              right: "10px",
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              fontSize: "16px",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* 🔥 POPUP - Only show when triggered */}
      {promo && showPromo && !promoDismissed && (
        <>
          {/* OVERLAY */}
          <div
            onClick={() => {
              setShowPromo(false);
              setPromoDismissed(true);
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(3px)",
              zIndex: 999,
            }}
          ></div>

          {/* POPUP CARD */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#1b1b1f",
              padding: "35px 25px",
              borderRadius: "22px",
              width: "90%",
              maxWidth: "480px",
              color: "white",
              textAlign: "center",
              boxShadow: "0px 0px 20px rgba(255, 0, 80, 0.5)",
              zIndex: 1000,
              animation: "promoFadeIn 0.6s ease-out",
            }}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => {
                setShowPromo(false);
                setShowPromo(false);
setPromoDismissed(true); // ONLY hides popup

              }}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "white",
                fontSize: "18px",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <div
              style={{
                display: "inline-block",
                padding: "8px 20px",
                borderRadius: "40px",
                background: "linear-gradient(90deg, #ff6b6b, #ff4757)",
                fontWeight: "700",
                fontSize: "18px",
                marginBottom: "15px",
              }}
            >
              🔥 Oferta Especial Hoje!
            </div>

            <h2
              style={{
                fontSize: "30px",
                fontWeight: "800",
                marginBottom: "10px",
                background: "linear-gradient(90deg, #ff8a00, #ff006a)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {promo.title}
            </h2>

            <p style={{ fontSize: "18px", opacity: 0.8 }}>{promo.text}</p>

            <button onClick={promo.action}

              style={{
                marginTop: "25px",
                background: "linear-gradient(90deg, #ff8a00, #ff006a)",
                color: "#fff",
                border: "none",
                padding: "14px 40px",
                borderRadius: "50px",
                fontSize: "18px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 0 18px rgba(255, 70, 70, 0.45)",
              }}
            >
              {promo.button}
            </button>
          </div>
        </>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Configurações</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="modal-close"
              >
                ✕
              </button>
            </div>

            {/* Profile Edit Section */}
            <div className="modal-body">
              <div className="settings-section">
                <h3 className="settings-section-title">Editar Perfil</h3>
                <div className="settings-form">
                  <label className="settings-label">Nome</label>
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="settings-input"
                  />

                  <button
                    onClick={() => {
                      const user = JSON.parse(localStorage.getItem("user")) || {};
                      const updatedUser = {
                        ...user,
                        name: userInfo.name,
                        email: userInfo.email,
                      };
                      localStorage.setItem("user", JSON.stringify(updatedUser));
                      alert("Perfil atualizado com sucesso!");
                      setShowSettings(false);
                      window.location.reload();
                    }}
                    className="save-button"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>

              {/* Security Settings */}
              <div className="settings-section">
                <h3 className="settings-section-title">Senha e Segurança</h3>
                <button
                  className="settings-item"
                  onClick={() => {
                    setShowSettings(false);
                    navigate("/CheckoutPage");
                  }}
                >
                  <div className="settings-item-content">
                    <Lock size={20} />
                    <div className="settings-item-text">
                      <p>Alterar Senha</p>
                      <span>Atualize sua senha de login</span>
                    </div>
                  </div>
                  <span className="settings-item-arrow">›</span>
                </button>
              </div>

              {/* Subscription Section */}
              <div className="settings-section">
                <h3 className="settings-section-title">Assinatura</h3>
                <div className="settings-items">
                  <button
                    className="settings-item"
                    onClick={() => {
                      setShowSettings(false);
                      navigate("/CheckoutPage");
                    }}
                  >
                    <div className="settings-item-content">
                      <Crown size={20} className="text-yellow" />
                      <div className="settings-item-text">
                        <p>Plano Premium</p>
                        <span>{planInfo.validUntil || "Ativo"}</span>
                      </div>
                    </div>
                    <span className="settings-item-arrow">›</span>
                  </button>
                </div>
              </div>

              <button onClick={handleLogout} className="logout-button">
                <LogOut size={20} />
                <span>Sair da Conta</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Stats Banner */}
      <section className="stats-banner">
        <div className="stats-banner-card">
          <div className="stats-banner-header">
            <div className="stats-banner-icon">
              <Crown size={32} />
            </div>
            <div className="stats-banner-info">
              <div className="stats-banner-title-row">
                <h2 className="stats-banner-title">{planInfo.name}</h2>
                <span className="stats-badge">Ativo</span>
              </div>
             
            </div>
          </div>

          {/* Quick Stats */}
          <section className="quick-stats">
            <div className="quick-stats-grid">
              <div className="quick-stat-card">
                <div className="quick-stat-icon quick-stat-icon-purple">
                  <TrendingUp size={20} />
                </div>
                <div className="quick-stat-info">
                  <div className="quick-stat-number">156</div>
                  <div className="quick-stat-label">Total Views</div>
                </div>
              </div>

              <div className="quick-stat-card">
                <div className="quick-stat-icon quick-stat-icon-pink">
                  <Heart size={20} />
                </div>
                <div className="quick-stat-info">
                  <div className="quick-stat-number">{likedItems.length}</div>
                  <div className="quick-stat-label">Favoritos</div>
                </div>
              </div>

             
              <div className="quick-stat-card">
                <div className="quick-stat-icon quick-stat-icon-green">
                  <Calendar size={20} />
                </div>
                <div className="quick-stat-info">
                  <div className="quick-stat-number">47</div>
                  <div className="quick-stat-label">Dias Restantes</div>
                </div>
              </div>
            </div>
          </section>
          <br></br>

          <div className="progress-section">
            <div className="progress-header">
              <span>Progresso de visualização</span>
              <span>
                {Math.round(
                  (userPlan.mediaViewed / userPlan.mediaAccess) * 100
                )}
                %
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    (userPlan.mediaViewed / userPlan.mediaAccess) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>


      {/* Content Section */}
      <section className="content-section">
        <div className="content-filters">
          <div className="filter-tabs">
            <button
              onClick={() => setActiveTab("all")}
              className={`filter-tab ${
                activeTab === "all" ? "filter-tab-active" : ""
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`filter-tab ${
                activeTab === "photos" ? "filter-tab-active" : ""
              }`}
            >
              📷 Fotos
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`filter-tab ${
                activeTab === "videos" ? "filter-tab-active" : ""
              }`}
            >
              🎥 Vídeos
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`filter-tab ${
                activeTab === "favorites" ? "filter-tab-active" : ""
              }`}
            >
              ❤️ Favoritos
            </button>
          </div>

          <div className="content-controls">
            <div className="item-count">
              {filteredContent.length}{" "}
              {filteredContent.length === 1 ? "item" : "itens"}
            </div>
            <div className="view-controls">
              <button className="control-button">
                <Filter size={18} />
              </button>
              <div className="view-toggle">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`view-button ${
                    viewMode === "grid" ? "view-button-active" : ""
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`view-button ${
                    viewMode === "list" ? "view-button-active" : ""
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Media Grid/List */}
        <div className={viewMode === "grid" ? "media-grid" : "media-list"}>
          {currentItems.map((item) => (
            <div
              key={item.id}
              className={viewMode === "grid" ? "media-card" : "media-list-item"}
            >
              {viewMode === "grid" ? (
                <>
                  <div className="media-thumbnail-wrapper">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className={`media-thumbnail ${
                        item.locked ? "media-locked-blur" : ""
                      }`}
                    />

                    {item.locked && (
                      <div className="media-locked-overlay">
                        <Lock size={32} />
                        <p className="media-locked-text">VIP Only</p>
                      </div>
                    )}

                    {!item.locked && (
                      <>
                        {item.type === "video" && (
                          <div className="video-duration">
                            <Play size={12} />
                            {item.duration}
                          </div>
                        )}

                        <button
                          onClick={() => toggleLike(item.id)}
                          className={`like-button ${
                            likedItems.includes(item.id)
                              ? "like-button-active"
                              : ""
                          }`}
                        >
                          <Heart
                            size={16}
                            className={
                              likedItems.includes(item.id) ? "heart-filled" : ""
                            }
                          />
                        </button>

                        <div className="media-hover-overlay">
                          <div className="media-actions">
                            <button
                              className="action-button action-button-primary"
                              onClick={() => setSelectedImage(item.thumbnail)}
                            >
                              {item.type === "video" ? "Assistir" : "Ver"}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="media-info">
                    <h3 className="media-title">{item.title}</h3>
                    <div className="media-meta">
                      <span>
                        {new Date(item.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </span>
                      <span className="media-views">{item.views} views</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="list-thumbnail-wrapper">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className={`list-thumbnail ${
                        item.locked ? "media-locked-blur" : ""
                      }`}
                    />
                    {item.locked && (
                      <div className="list-locked-overlay">
                        <Lock size={20} />
                      </div>
                    )}
                    {!item.locked && item.type === "video" && (
                      <div className="list-play-overlay">
                        <Play size={20} />
                      </div>
                    )}
                  </div>

                  <div className="list-info">
                    <h3 className="list-title">{item.title}</h3>
                    <div className="list-meta">
                      <span>
                        {item.type === "video" ? "🎥 Vídeo" : "📷 Foto"}
                      </span>
                      <span className="list-date">
                        {new Date(item.date).toLocaleDateString("pt-BR")}
                      </span>
                      <span className="list-views">{item.views} views</span>
                    </div>
                  </div>

                  {!item.locked && (
                    <div className="list-actions">
                      <button
                        onClick={() => toggleLike(item.id)}
                        className={`list-like-button ${
                          likedItems.includes(item.id) ? "list-like-active" : ""
                        }`}
                      >
                        <Heart
                          size={16}
                          className={
                            likedItems.includes(item.id) ? "heart-filled" : ""
                          }
                        />
                      </button>
                      <button className="list-action-button">
                        {item.type === "video" ? "Assistir" : "Ver"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
{/* Pagination Controls */}
{totalPages > 1 && (
  <div className="pagination">
    <button 
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
      disabled={currentPage === 1}
    >
      ← Prev
    </button>
    
    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={currentPage === index + 1 ? "active" : ""}
      >
        {index + 1}
      </button>
    ))}
    
    <button 
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
      disabled={currentPage === totalPages}
    >
      Next →
    </button>
  </div>
)}

        {filteredContent.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <Heart size={40} />
            </div>
            <h3 className="empty-title">Nenhum conteúdo encontrado</h3>
            <p className="empty-text">Tente selecionar um filtro diferente</p>
          </div>
        )}
      </section>

     
      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
          }}
          onClick={() => setSelectedImage(null)}
          onContextMenu={(e) => e.preventDefault()}
          onKeyDown={(e) => {
            // Detect screenshot shortcuts
            if (
              e.key === "PrintScreen" ||
              (e.metaKey &&
                e.shiftKey &&
                (e.key === "3" || e.key === "4" || e.key === "5")) || // Mac
              (e.metaKey && e.shiftKey && e.key === "s") || // Mac Shift+Cmd+S
              (e.ctrlKey && e.key === "p") || // Print
              e.key === "F12" // DevTools
            ) {
              e.preventDefault();
              alert("⚠️ Screenshots are not allowed for content protection");
            }
          }}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              width: "48px",
              height: "48px",
              backgroundColor: "#dc2626",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
              border: "2px solid white",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              zIndex: 1000000,
              userSelect: "none",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#b91c1c")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#dc2626")
            }
          >
            ✕
          </button>

          {/* Image Container with Protection */}
          <div
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              userSelect: "none",
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
            }}
          >
            <img
              src={selectedImage}
              alt="Preview"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
                pointerEvents: "none",
                userSelect: "none",
                WebkitUserSelect: "none",
                WebkitUserDrag: "none",
                WebkitTouchCallout: "none",
              }}
            />

            {/* Invisible Protection Overlay */}
            <div
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                cursor: "default",
                userSelect: "none",
              }}
            />

            {/* Watermark Overlay */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "rgba(255, 255, 255, 0.15)",
                fontSize: "48px",
                fontWeight: "bold",
                pointerEvents: "none",
                userSelect: "none",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                whiteSpace: "nowrap",
              }}
            >
              hnyclb.online
            </div>
          </div>
        </div>
      )}
        {/* WhatsApp Floating Button */}
<a
  href="https://wa.me/5511987058492"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#25D366",
    color: "white",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    zIndex: 10000,
    cursor: "pointer",
    textDecoration: "none",
  }}
>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
    alt="WhatsApp"
    style={{ width: "35px", height: "35px" }}
  />
</a>

    </div>
  );
}
