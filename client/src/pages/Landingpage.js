<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nick (@nickboyofc)</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background: linear-gradient(180deg, #0e7490 0%, #06b6d4 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 0;
            color: #fff;
        }

        .profile-container {
            width: 100%;
            max-width: 480px;
            background: #000;
            min-height: 100vh;
            position: relative;
        }

        /* Hero Section */
        .hero-section {
            position: relative;
            width: 100%;
        }

        .hero-image {
            width: 100%;
            height: 450px;
            object-fit: cover;
            display: block;
        }

        .profile-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px;
            background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%);
            text-align: center;
        }

        .profile-name {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 6px;
            letter-spacing: -0.5px;
        }

        .profile-handle {
            color: #a3a3a3;
            font-size: 16px;
            margin-bottom: 18px;
            font-weight: 400;
        }

        .social-icons {
            display: flex;
            justify-content: center;
            gap: 14px;
        }

        .social-icon {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s;
        }

        .social-icon:active {
            transform: scale(0.95);
        }

        /* Content Section */
        .content-section {
            padding: 20px;
        }

        /* WhatsApp Button with Icon */
        .whatsapp-button-wrapper {
            position: relative;
            margin-bottom: 16px;
        }

        .whatsapp-icon-left {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            width: 28px;
            height: 28px;
            z-index: 1;
        }

        .whatsapp-button {
            width: 100%;
            padding: 16px 24px;
            background: transparent;
            border: 2px solid #25D366;
            border-radius: 50px;
            color: #fff;
            font-size: 17px;
            font-weight: 600;
            cursor: pointer;
            text-align: center;
            transition: all 0.2s;
        }

        .whatsapp-button:active {
            transform: scale(0.98);
        }

        /* Exclusive Content Button */
        .exclusive-button {
            width: 100%;
            padding: 18px 24px;
            background: #fff;
            border: none;
            border-radius: 50px;
            color: #000;
            font-size: 17px;
            font-weight: 700;
            cursor: pointer;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.2s;
        }

        .exclusive-button:active {
            transform: scale(0.98);
        }

        .exclusive-icon {
            width: 22px;
            height: 22px;
            animation: rotate 2s linear infinite;
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /* Image Grid */
        .image-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        }

        .grid-item {
            aspect-ratio: 1;
            border-radius: 20px;
            overflow: hidden;
            background: #1a1a1a;
        }

        .grid-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* Favorite Text */
        .favorite-text {
            text-align: center;
            font-size: 15px;
            color: #fff;
            margin-bottom: 24px;
            font-weight: 400;
        }

        /* Tabs */
        .tabs {
            display: flex;
            justify-content: center;
            gap: 40px;
            border-bottom: 1px solid #262626;
            padding-bottom: 12px;
            margin-bottom: 30px;
        }

        .tab {
            font-size: 16px;
            font-weight: 700;
            color: #fff;
            cursor: pointer;
            padding-bottom: 12px;
            border-bottom: 3px solid transparent;
            transition: all 0.2s;
            position: relative;
        }

        .tab.active {
            border-bottom-color: #fff;
        }

        .tab.inactive {
            color: #525252;
            font-weight: 600;
        }

        /* No Content State */
        .no-content {
            text-align: center;
            padding: 50px 30px 60px;
        }

        .no-content-emoji {
            font-size: 80px;
            margin-bottom: 20px;
            display: inline-block;
        }

        .no-content h3 {
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 10px;
            color: #fff;
        }

        .no-content p {
            font-size: 15px;
            color: #737373;
            font-weight: 400;
        }

        /* Footer */
        .footer {
            text-align: center;
            padding: 30px 20px 40px;
            border-top: 1px solid #171717;
        }

        .footer-branding {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 14px;
        }

        .footer-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .footer-logo {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 11px;
            color: #fff;
        }

        .footer-text {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 14px;
            color: #fff;
        }

        .footer-links {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            color: #737373;
        }

        .footer-links a {
            color: #737373;
            text-decoration: none;
            transition: color 0.2s;
        }

        .footer-links a:hover {
            color: #a3a3a3;
        }

        .footer-links .separator {
            color: #404040;
        }

        @media (max-width: 600px) {
            .hero-image {
                height: 400px;
            }
        }
    </style>
</head>
<body>
    <div class="profile-container">
        <!-- Hero Section -->
        <div class="hero-section">
            <img src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=800&fit=crop" alt="Nick" class="hero-image">
            
            <div class="profile-overlay">
                <h1 class="profile-name">Nick</h1>
                <p class="profile-handle">@nickboyofc</p>
                
                <div class="social-icons">
                    <div class="social-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="3" width="18" height="18" rx="4" stroke="#E4405F" stroke-width="2.5"/>
                            <circle cx="12" cy="12" r="3.5" stroke="#E4405F" stroke-width="2.5"/>
                            <circle cx="17.5" cy="6.5" r="1.2" fill="#E4405F"/>
                        </svg>
                    </div>
                    <div class="social-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#171717" stroke-width="2.5" stroke-linecap="round"/>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#171717" stroke-width="2.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="social-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="#FF0000" stroke-width="2.5"/>
                            <path d="M10 9L15 12L10 15V9Z" fill="#FF0000"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content Section -->
        <div class="content-section">
            <!-- WhatsApp Button -->
            <div class="whatsapp-button-wrapper">
                <svg class="whatsapp-icon-left" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.87.52 3.62 1.42 5.12L2 22l5.12-1.42C8.62 21.48 10.37 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.45 14.36c-.23.64-1.35 1.24-1.87 1.3-.52.06-1.01.24-3.42-.72-2.89-1.15-4.73-4.09-4.88-4.28-.14-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.02-2.41.27-.29.59-.36.79-.36.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.58.83 2.03.9 2.18.07.15.12.33.02.52-.1.19-.15.31-.29.48-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.16.28.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.27 1.4.28.14.45.12.62-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.1 1.66.78 1.94.92.28.14.47.21.54.33.07.12.07.69-.16 1.33z" fill="#25D366"/>
                </svg>
                <button class="whatsapp-button">Vem falar comigo</button>
            </div>

            <!-- Exclusive Content Button -->
            <button class="exclusive-button">
                <svg class="exclusive-icon" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="2" fill="#06b6d4"/>
                    <circle cx="12" cy="4" r="1.5" fill="#06b6d4"/>
                    <circle cx="12" cy="20" r="1.5" fill="#06b6d4"/>
                    <circle cx="4" cy="12" r="1.5" fill="#06b6d4"/>
                    <circle cx="20" cy="12" r="1.5" fill="#06b6d4"/>
                    <circle cx="7" cy="7" r="1" fill="#06b6d4"/>
                    <circle cx="17" cy="7" r="1" fill="#06b6d4"/>
                    <circle cx="7" cy="17" r="1" fill="#06b6d4"/>
                    <circle cx="17" cy="17" r="1" fill="#06b6d4"/>
                </svg>
                Conteúdo exclusivo
            </button>

            <!-- Image Grid -->
            <div class="image-grid">
                <div class="grid-item">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" alt="Preview 1">
                </div>
                <div class="grid-item">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" alt="Preview 2">
                </div>
                <div class="grid-item">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" alt="Preview 3">
                </div>
            </div>

            <!-- Favorite Text -->
            <p class="favorite-text">Seu motorista favorito está aqui. 🏎️💨</p>

            <!-- Tabs -->
            <div class="tabs">
                <div class="tab active">Shouts</div>
                <div class="tab inactive">Media</div>
            </div>

            <!-- No Content -->
            <div class="no-content">
                <div class="no-content-emoji">💬</div>
                <h3>No Shouts yet!</h3>
                <p>Shouts posted by Nick will<br>appear here</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-branding">
                <div class="footer-avatar"></div>
                <div class="footer-logo">me</div>
            </div>
            <div class="footer-text">Create Your Profile On Linkme</div>
            <div class="footer-links">
                <a href="#">Privacy Policy</a>
                <span class="separator">|</span>
                <a href="#">Terms</a>
                <span class="separator">|</span>
                <a href="#">Report</a>
            </div>
        </div>
    </div>
</body>
</html>
