import React from 'react';

export default function PortfolioHero() {
  const handleWhatsAppClick = () => {
    const number = "5511981447980";
    const message = "Quero conhecer os produtos !";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${number}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="portfolio-hero">
      {/* Animated background with gradient mesh */}
      <div className="background-container">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="noise-overlay"></div>
      </div>

      {/* Main content container */}
      <div className="content-wrapper">
        {/* Profile section with floating animation */}
        <div className="profile-section">
          <div className="profile-ring"></div>
          <div className="profile-image">
            {/* Replace this div with your actual image: <img src="your-image.jpg" alt="Profile" /> */}
            <div className="placeholder-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
          <div className="status-badge">
            <span className="pulse-dot"></span>
            <span>Disponível agora</span>
          </div>
        </div>

        {/* Text content */}
        <div className="text-content">
          <h1 className="main-headline">
            <span className="headline-line">Me chama agora no</span>
            <span className="headline-highlight">WhatsApp</span>
            <span className="headline-line">e receba conteúdo</span>
            <span className="headline-highlight">exclusivo</span>
          </h1>

          <p className="subtitle">
            Acesso a conteúdo privado de boas-vindas + oferta especial só pra quem veio pelo anúncio.
            <span className="emphasis-text"> Rápido, reservado e feito pra te deixar querendo mais.</span>
          </p>

          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🔒</div>
              <span>100% Privado</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">⚡</div>
              <span>Acesso Imediato</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🎁</div>
              <span>Bônus Exclusivo</span>
            </div>
          </div>
        </div>

        {/* CTA Button with enhanced effects */}
        <button 
          className="whatsapp-cta"
          onClick={handleWhatsAppClick}
        >
          <span className="button-glow"></span>
          <span className="button-content">
            <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Receber meu bônus de boas-vindas
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </button>

        {/* Trust indicators */}
        <div className="trust-section">
          <div className="trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Resposta em minutos</span>
          </div>
          <div className="trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <span>100% seguro e discreto</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .portfolio-hero {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
        }

        /* Animated background */
        .background-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(45deg, #10b981, #059669);
          top: -10%;
          left: -10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(45deg, #06b6d4, #0891b2);
          bottom: -10%;
          right: -10%;
          animation-delay: 7s;
        }

        .orb-3 {
          width: 350px;
          height: 350px;
          background: linear-gradient(45deg, #8b5cf6, #7c3aed);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 14s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          opacity: 0.5;
          pointer-events: none;
        }

        /* Main content */
        .content-wrapper {
          position: relative;
          z-index: 10;
          max-width: 900px;
          width: 90%;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Profile section */
        .profile-section {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          animation: fadeInUp 1s ease-out 0.2s backwards;
        }

        .profile-ring {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #10b981, #06b6d4, #8b5cf6, #10b981);
          animation: rotate 4s linear infinite;
          opacity: 0.6;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .profile-image {
          position: relative;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 4px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .placeholder-avatar {
          width: 80px;
          height: 80px;
          color: rgba(255, 255, 255, 0.4);
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 50px;
          color: #10b981;
          font-size: 0.875rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        /* Text content */
        .text-content {
          text-align: center;
          animation: fadeInUp 1s ease-out 0.4s backwards;
        }

        .main-headline {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .headline-line {
          color: #ffffff;
          display: block;
        }

        .headline-highlight {
          background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
          text-shadow: 0 0 40px rgba(16, 185, 129, 0.3);
        }

        .subtitle {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          max-width: 700px;
          margin: 0 auto 2rem;
        }

        .emphasis-text {
          color: #10b981;
          font-weight: 600;
        }

        /* Benefits grid */
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
          width: 100%;
          max-width: 600px;
        }

        .benefit-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .benefit-item:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .benefit-icon {
          font-size: 2rem;
        }

        .benefit-item span {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          font-weight: 600;
        }

        /* WhatsApp CTA Button */
        .whatsapp-cta {
          position: relative;
          padding: 1.25rem 2.5rem;
          font-size: clamp(1rem, 2.5vw, 1.125rem);
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, #16a34a 0%, #10b981 100%);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(16, 185, 129, 0.4);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation: fadeInUp 1s ease-out 0.6s backwards;
          width: 100%;
          max-width: 500px;
        }

        .button-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .whatsapp-cta:hover .button-glow {
          opacity: 1;
        }

        .whatsapp-cta:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 20px 60px rgba(16, 185, 129, 0.5);
        }

        .whatsapp-cta:active {
          transform: translateY(-1px) scale(0.98);
        }

        .button-content {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .whatsapp-icon {
          width: 24px;
          height: 24px;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .arrow-icon {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        .whatsapp-cta:hover .arrow-icon {
          transform: translateX(5px);
        }

        /* Trust section */
        .trust-section {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          animation: fadeInUp 1s ease-out 0.8s backwards;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .trust-item svg {
          width: 20px;
          height: 20px;
          color: #10b981;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .content-wrapper {
            gap: 2rem;
            padding: 1.5rem;
          }

          .profile-ring {
            width: 140px;
            height: 140px;
          }

          .profile-image {
            width: 120px;
            height: 120px;
          }

          .placeholder-avatar {
            width: 60px;
            height: 60px;
          }

          .main-headline {
            gap: 0.3rem;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
            max-width: 100%;
          }

          .whatsapp-cta {
            padding: 1rem 2rem;
            max-width: 100%;
          }

          .trust-section {
            flex-direction: column;
            gap: 1rem;
          }

          .orb-1, .orb-2, .orb-3 {
            width: 300px;
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          .portfolio-hero {
            min-height: 100dvh;
          }

          .button-content {
            font-size: 0.9rem;
            gap: 0.5rem;
          }

          .whatsapp-icon {
            width: 20px;
            height: 20px;
          }

          .arrow-icon {
            width: 18px;
            height: 18px;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
