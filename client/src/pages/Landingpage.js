import React, { useEffect } from 'react';
import img1 from "../assets/11111.JPG";
import img2 from "../assets/44444.JPG";
import img3 from "../assets/33333.JPG";
import img4 from "../assets/222222.JPG";

export default function LinkmeProfile() {
  // Add animation keyframes when component mounts
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);
    
    // Cleanup
    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  return (
    <div style={styles.body}>
      <div style={styles.profileContainer}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <img 
            src={img1}
            alt="Nick" 
            style={styles.heroImage}
          />
          
          <div style={styles.profileOverlay}>
            <h1 style={styles.profileName}>Nick</h1>
            <p style={styles.profileHandle}>@nickboyofc</p>
            
            <div style={styles.socialIcons}>
              <div style={styles.socialIcon} onClick={() => window.open('https://instagram.com/nickboyofc', '_blank')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="4" stroke="#E4405F" strokeWidth="2.5"/>
                  <circle cx="12" cy="12" r="3.5" stroke="#E4405F" strokeWidth="2.5"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="#E4405F"/>
                </svg>
              </div>
              <div style={styles.socialIcon} onClick={() => alert('Link profile')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#171717" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#171717" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={styles.socialIcon} onClick={() => window.open('https://youtube.com/@nickboyofc', '_blank')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="#FF0000" strokeWidth="2.5"/>
                  <path d="M10 9L15 12L10 15V9Z" fill="#FF0000"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div style={styles.contentSection}>
          {/* WhatsApp Button */}
          <div style={styles.whatsappButtonWrapper}>
            <svg style={styles.whatsappIconLeft} viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.87.52 3.62 1.42 5.12L2 22l5.12-1.42C8.62 21.48 10.37 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.45 14.36c-.23.64-1.35 1.24-1.87 1.3-.52.06-1.01.24-3.42-.72-2.89-1.15-4.73-4.09-4.88-4.28-.14-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.02-2.41.27-.29.59-.36.79-.36.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.58.83 2.03.9 2.18.07.15.12.33.02.52-.1.19-.15.31-.29.48-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.16.28.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.27 1.4.28.14.45.12.62-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.1 1.66.78 1.94.92.28.14.47.21.54.33.07.12.07.69-.16 1.33z" fill="#ef4444"/>
            </svg>
            <button style={styles.whatsappButton} onClick={() => window.open('https://wa.me/', '_blank')}>
              Vem falar comigo
            </button>
          </div>

          {/* Exclusive Content Button */}
          <button style={styles.exclusiveButton} onClick={() => alert('Conteúdo exclusivo!')}>
            <svg style={styles.exclusiveIcon} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="2" fill="#fff"/>
              <circle cx="12" cy="4" r="1.5" fill="#fff"/>
              <circle cx="12" cy="20" r="1.5" fill="#fff"/>
              <circle cx="4" cy="12" r="1.5" fill="#fff"/>
              <circle cx="20" cy="12" r="1.5" fill="#fff"/>
              <circle cx="7" cy="7" r="1" fill="#fff"/>
              <circle cx="17" cy="7" r="1" fill="#fff"/>
              <circle cx="7" cy="17" r="1" fill="#fff"/>
              <circle cx="17" cy="17" r="1" fill="#fff"/>
            </svg>
            Conteúdo exclusivo
          </button>

          {/* Image Grid */}
          <div style={styles.imageGrid}>
            <div style={styles.gridItem}>
              <img src={img2} alt="Preview 1" style={styles.gridImage} />
            </div>
            <div style={styles.gridItem}>
              <img src={img3} alt="Preview 2" style={styles.gridImage} />
            </div>
            <div style={styles.gridItem}>
              <img src={img4} alt="Preview 3" style={styles.gridImage} />
            </div>
          </div>

          {/* Favorite Text */}
          <p style={styles.favoriteText}>
            Ele vem de moto,<br/>
            volta deixando saudade.<br/>
            Nickboy — seu corre +18<br/>
            <br/>
            Nem toda corrida é comportada.<br/>
            Confira as gostosuras aqui.<br/>
            Seu motorista 18+
          </p>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.footerBranding}>
            <div style={styles.footerAvatar}>
              <img src={img1} alt="Avatar" style={styles.avatarImg} />
            </div>
            <div style={styles.footerLogo}>me</div>
          </div>
          <div style={styles.footerText}>Create Your Profile On Linkme</div>
          <div style={styles.footerLinks}>
            <a href="#" style={styles.footerLink} onClick={(e) => { e.preventDefault(); alert('Privacy Policy'); }}>Privacy Policy</a>
            <span style={styles.separator}>|</span>
            <a href="#" style={styles.footerLink} onClick={(e) => { e.preventDefault(); alert('Terms'); }}>Terms</a>
            <span style={styles.separator}>|</span>
            <a href="#" style={styles.footerLink} onClick={(e) => { e.preventDefault(); alert('Report'); }}>Report</a>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    background: 'linear-gradient(135deg, #2d0a0e 0%, #5a1520 50%, #1a0507 100%)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 0,
    color: '#fff',
    margin: 0,
  },
  profileContainer: {
    width: '100%',
    maxWidth: '480px',
    background: 'linear-gradient(180deg, #1a0507 0%, #0d0304 100%)',
    minHeight: '100vh',
    position: 'relative',
  },
  heroSection: {
    position: 'relative',
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '450px',
    objectFit: 'cover',
    display: 'block',
  },
  profileOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '20px',
    background: 'linear-gradient(to top, rgba(26,5,7,0.95) 0%, rgba(45,10,14,0.8) 50%, transparent 100%)',
    textAlign: 'center',
  },
  profileName: {
    fontSize: '36px',
    fontWeight: 700,
    marginBottom: '6px',
    letterSpacing: '-0.5px',
    margin: '0 0 6px 0',
  },
  profileHandle: {
    color: '#a3a3a3',
    fontSize: '16px',
    marginBottom: '18px',
    fontWeight: 400,
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '14px',
  },
  socialIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  contentSection: {
    padding: '20px',
  },
  whatsappButtonWrapper: {
    position: 'relative',
    marginBottom: '16px',
  },
  whatsappIconLeft: {
    position: 'absolute',
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '28px',
    height: '28px',
    zIndex: 1,
    pointerEvents: 'none',
  },
  whatsappButton: {
    width: '100%',
    padding: '16px 24px',
    background: 'transparent',
    border: '2px solid #ef4444',
    borderRadius: '50px',
    color: '#fff',
    fontSize: '17px',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s',
  },
  exclusiveButton: {
    width: '100%',
    padding: '18px 24px',
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    border: 'none',
    borderRadius: '50px',
    color: '#fff',
    fontSize: '17px',
    fontWeight: 700,
    cursor: 'pointer',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'all 0.2s',
  },
  exclusiveIcon: {
    width: '22px',
    height: '22px',
    animation: 'rotate 2s linear infinite',
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '20px',
  },
  gridItem: {
    aspectRatio: '1',
    borderRadius: '20px',
    overflow: 'hidden',
    background: '#2a0a0f',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  favoriteText: {
    textAlign: 'center',
    fontSize: '15px',
    color: '#fff',
    marginBottom: '24px',
    fontWeight: 400,
    lineHeight: '1.6',
  },
  footer: {
    textAlign: 'center',
    padding: '30px 20px 40px',
    borderTop: '1px solid #2d0a0e',
  },
  footerBranding: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '14px',
  },
  footerAvatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  footerLogo: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: '11px',
    color: '#fff',
  },
  footerText: {
    fontSize: '16px',
    fontWeight: 700,
    marginBottom: '14px',
    color: '#fff',
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#737373',
  },
  footerLink: {
    color: '#737373',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  separator: {
    color: '#404040',
  },
};
