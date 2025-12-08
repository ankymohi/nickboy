import React from 'react';

export default function PortfolioHero() {
  const handleWhatsAppClick = () => {
  const number = "5511987058492"; 
  const message = "Quero ver as prévias !";
  const encodedMessage = encodeURIComponent(message);

  window.open(`https://wa.me/${number}?text=${encodedMessage}`, "_blank");
};


  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundColor: '#000',
      overflow: 'hidden'
    }}>
      {/* Background gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.95) 50%, transparent 100%)',
        zIndex: 10
      }} />
      
      {/* Profile image container */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: '100%',
        maxWidth: '50%',
backgroundImage: `url(${require('../assets/1.jpeg')})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
      }}>
        <div style={{
          position: 'relative',
          height: '100%',
          width: '100%'
        }}>
          {/* Placeholder for profile image - replace with your actual image */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, #4a4a4a, #000)',
          opacity: 0.5
          }} />
          <div style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '100%',
            height: '75%',
            background: 'linear-gradient(to left, rgba(100,100,100,0.3), transparent)'
          }} />
        </div>
      </div>

      {/* Content */}
     <div
  style={{
    position: 'relative',
    zIndex: 20,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 100px 0px 10px'
  }}
>

        <div style={{ maxWidth: '600px' }}>
          {/* Main Headline */}
          <h1 style={{
            color: '#fff',
            fontFamily: 'Arial, sans-serif',
            fontSize: 'clamp(28px, 4.5vw, 52px)',
            fontWeight: 'bold',
            lineHeight: '1.3',
            marginBottom: '24px',
            letterSpacing: '0.5px'
          }}>
            Conteúdos exclusivos e atendimento personalizado — fale comigo no WhatsApp 🌈
          </h1>
          
          {/* Subtitle */}
          <p style={{
            color: '#d1d5db',
            fontFamily: 'Arial, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            lineHeight: '1.6',
            marginBottom: '40px',
            fontWeight: '300'
          }}>
            Aqui você recebe tudo de forma privada, discreta e segura, com acesso rápido e direto.
          </p>
          
          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsAppClick}
            style={{
              background: 'linear-gradient(to right, #dc2626, #ef4444)',
              color: '#fff',
              padding: '18px 40px',
              fontSize: 'clamp(16px, 2vw, 20px)',
              fontWeight: 600,
              letterSpacing: '0.5px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(220, 38, 38, 0.4)',
              transition: 'all 0.3s ease',
              fontFamily: 'Arial, sans-serif',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.02)';
              e.target.style.background = 'linear-gradient(to right, #ef4444, #f87171)';
              e.target.style.boxShadow = '0 15px 40px rgba(220, 38, 38, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.background = 'linear-gradient(to right, #dc2626, #ef4444)';
              e.target.style.boxShadow = '0 10px 30px rgba(220, 38, 38, 0.4)';
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>👉</span>
              Quero receber agora no WhatsApp
            </span>
          </button>
        </div>
      </div>

      {/* Movie Icon in bottom right */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        right: '32px',
        zIndex: 20
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f97316, #dc2626, #ec4899)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(220, 38, 38, 0.4)'
        }}>
          <svg width="40" height="40" fill="#fff" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 11H9.5v3H8v-3H6.5v-1.5H8v-3h1.5v3H11V14zm7 3h-1.5v-4.5h-1v-1l2.5-2V14z"/>
          </svg>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="padding: 0 80px"] {
            padding: 0 24px !important;
          }
          div[style*="maxWidth: 50%"] {
            max-width: 100% !important;
          }
        }
        @media (min-width: 1200px) {
          div[style*="padding: 0 80px"] {
            padding: 0 120px !important;
          }
        }
        @media (max-width: 768px) {
  .hero-content {
    padding: 0 20px !important;
  }
}
      `}
</style>
    </div>
  );
}
