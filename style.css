:root {
    --bg-gradient: linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%);
    --card-bg: rgba(255, 255, 255, 0.92);
    --card-border: rgba(2, 132, 199, 0.2);
    --text-primary: #0f172a;
    --text-secondary: #334155;
    --accent: #0284c7;
    --accent-glow: rgba(2, 132, 199, 0.25);
    --purple: #7c3aed;
    --success: #059669;
    --font-main: "Times New Roman", Times, serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    background: var(--bg-gradient) !important;
    background-attachment: fixed !important;
    color: var(--text-primary) !important;
    font-family: var(--font-main) !important;
    overflow-x: hidden;
    min-height: 100vh;
}

/* 3D Glassmorphism Utilities with Depth Shadows */
.glass {
    background: var(--card-bg);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08), 0 5px 15px rgba(2, 132, 199, 0.05), inset 0 1px 0 rgba(255, 255, 255, 1);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* TOP BAR */
.top-bar {
    background: #e2e8f0;
    border-bottom: 1px solid var(--card-border);
    padding: 8px 0;
    font-size: 0.95rem;
}

.top-bar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.contact-snippets {
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
    color: var(--text-secondary);
}

.contact-snippets i {
    color: var(--accent);
    margin-right: 5px;
}

.social-links {
    display: flex;
    gap: 15px;
}

.social-links a {
    color: var(--text-secondary);
    transition: color 0.3s;
}

.social-links a:hover {
    color: var(--accent);
}

/* NAVBAR */
.navbar {
    position: sticky;
    top: 0;
    z-index: 1000;
    border-radius: 0;
    border-left: none;
    border-right: none;
    padding: 15px 0;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(16px);
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.brand-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: var(--text-primary);
}

.logo-img-box {
    width: 45px;
    height: 45px;
    background: linear-gradient(135deg, var(--accent), var(--purple));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: 0 4px 15px var(--accent-glow);
}

.logo-img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.brand-text h2 {
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 0.5px;
    color: var(--text-primary);
}

.brand-text span {
    font-size: 0.8rem;
    color: var(--accent);
    letter-spacing: 1.5px;
    font-weight: bold;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 25px;
    align-items: center;
}

.nav-links a {
    text-decoration: none;
    color: var(--text-secondary);
    font-weight: bold;
    font-size: 1.05rem;
    transition: color 0.3s;
}

.nav-links a:hover, .nav-links a.active {
    color: var(--accent);
}

/* Dropdown */
.dropdown {
    position: relative;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: #ffffff;
    border: 1px solid var(--card-border);
    border-radius: 12px;
    min-width: 220px;
    padding: 10px 0;
    display: none;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);
    z-index: 1010;
}

.dropdown:hover .dropdown-menu {
    display: block;
}

.dropdown-menu a {
    display: block;
    padding: 10px 20px;
    color: var(--text-secondary);
    font-size: 1rem;
    transition: all 0.2s;
}

.dropdown-menu a:hover {
    background: rgba(2, 132, 199, 0.08);
    color: var(--accent);
    padding-left: 25px;
}

/* 3-Dot Menu */
.nav-actions {
    display: flex;
    align-items: center;
    gap: 15px;
}

.lms-menu-container {
    position: relative;
}

.lms-trigger-btn {
    background: linear-gradient(135deg, var(--accent), var(--purple));
    border: none;
    color: #fff;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 15px var(--accent-glow);
    transition: transform 0.2s;
    font-family: var(--font-main);
}

.lms-trigger-btn:hover {
    transform: scale(1.05);
}

.lms-dropdown {
    position: absolute;
    top: 120%;
    right: 0;
    background: #ffffff;
    border: 1px solid var(--card-border);
    border-radius: 14px;
    width: 200px;
    padding: 10px 0;
    display: none;
    box-shadow: 0 15px 35px rgba(15, 23, 42, 0.15);
    z-index: 1020;
}

.lms-dropdown.show {
    display: block;
}

.lms-header {
    padding: 8px 15px;
    font-size: 0.8rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid var(--card-border);
    margin-bottom: 5px;
    font-weight: bold;
}

.lms-dropdown a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    color: var(--text-primary);
    text-decoration: none;
    font-size: 1rem;
    transition: background 0.2s;
}

.lms-dropdown a:hover {
    background: rgba(2, 132, 199, 0.08);
    color: var(--accent);
}

.dropdown-divider {
    height: 1px;
    background: var(--card-border);
    margin: 6px 0;
}

.menu-toggle {
    display: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-primary);
}

/* HERO SECTION (Centered Single-Column, Visual Graphic Removed) */
.hero-section {
    position: relative;
    padding: 100px 0 80px;
    overflow: hidden;
    text-align: center;
}

.hero-container-single {
    max-width: 850px;
    margin: 0 auto;
}

.center-align {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(2, 132, 199, 0.1);
    border: 1px solid rgba(2, 132, 199, 0.3);
    padding: 6px 16px;
    border-radius: 30px;
    font-size: 0.95rem;
    color: var(--accent);
    margin-bottom: 20px;
    font-weight: bold;
}

.hero-content h1 {
    font-size: 3.4rem;
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 20px;
    color: var(--text-primary);
}

.hero-content h1 span {
    background: linear-gradient(135deg, var(--accent), var(--purple));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-content p {
    color: var(--text-secondary);
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 30px;
    max-width: 700px;
}

.center-cta {
    justify-content: center;
    margin-bottom: 50px;
}

.btn {
    padding: 12px 28px;
    border-radius: 30px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: none;
    font-size: 1.05rem;
    font-family: var(--font-main);
}

.btn-primary {
    background: linear-gradient(135deg, var(--accent), var(--purple));
    color: #fff;
    box-shadow: 0 4px 20px var(--accent-glow);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px var(--accent-glow);
}

.btn-outline {
    background: transparent;
    border: 1px solid var(--accent);
    color: var(--accent);
}

.btn-outline:hover {
    background: rgba(2, 132, 199, 0.1);
}

.hero-stats-center {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
}

.stat-card {
    padding: 20px;
    text-align: center;
}

.stat-card h3 {
    font-size: 1.8rem;
    color: var(--accent);
    font-weight: bold;
}

.stat-card p {
    font-size: 0.95rem;
    color: var(--text-secondary);
    margin: 0;
}

/* SECTIONS & GRIDS */
section {
    padding: 80px 0;
}

.section-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 50px;
}

.section-header h2 {
    font-size: 2.6rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: var(--text-primary);
}

.section-header h2 span {
    background: linear-gradient(135deg, var(--accent), var(--purple));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.section-header p {
    color: var(--text-secondary);
    font-size: 1.15rem;
}

/* ABOUT */
.about-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.about-card {
    padding: 30px;
    transition: transform 0.3s;
}

.about-card:hover {
    transform: translateY(-5px);
    border-color: var(--accent);
}

.about-card .icon-box {
    width: 60px;
    height: 60px;
    background: rgba(2, 132, 199, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--accent);
    margin-bottom: 20px;
}

.about-card h3 {
    font-size: 1.4rem;
    margin-bottom: 12px;
    color: var(--text-primary);
    font-weight: bold;
}

.about-card p {
    color: var(--text-secondary);
    font-size: 1.05rem;
    line-height: 1.5;
}

/* COURSES */
.filter-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 40px;
    flex-wrap: wrap;
}

.filter-btn {
    background: #ffffff;
    border: 1px solid var(--card-border);
    color: var(--text-secondary);
    padding: 8px 20px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
    font-family: var(--font-main);
    font-size: 1rem;
}

.filter-btn.active, .filter-btn:hover {
    background: linear-gradient(135deg, var(--accent), var(--purple));
    color: #fff;
    border-color: transparent;
}

.courses-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
}

.course-card {
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s, border-color 0.3s;
    display: flex;
    flex-direction: column;
}

.course-card:hover {
    transform: translateY(-5px);
    border-color: var(--accent);
}

.course-img {
    height: 140px;
    background: linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(124, 58, 237, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: var(--accent);
}

.course-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.badge {
    display: inline-block;
    background: rgba(124, 58, 237, 0.1);
    color: var(--purple);
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: bold;
    margin-bottom: 10px;
    width: max-content;
}

.course-body h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: var(--text-primary);
    font-weight: bold;
}

.course-body p {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.4;
    margin-bottom: 20px;
    flex-grow: 1;
}

.course-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 0.95rem;
    color: var(--text-secondary);
    border-top: 1px solid var(--card-border);
    padding-top: 12px;
}

.view-blueprint {
    color: var(--accent);
    font-weight: bold;
}

/* SERVICES */
.services-section {
    background: rgba(255, 255, 255, 0.5);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.service-card {
    padding: 25px;
    cursor: pointer;
    transition: all 0.3s;
}

.service-card:hover {
    transform: translateY(-5px);
    background: rgba(2, 132, 199, 0.05);
    border-color: var(--accent);
}

.service-card .icon {
    font-size: 2rem;
    color: var(--accent);
    margin-bottom: 15px;
}

.service-card h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--text-primary);
    font-weight: bold;
}

.service-card p {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.4;
}

/* CONSULTING & TRAINING */
.consulting-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

.consulting-card {
    padding: 35px;
}

.icon-title {
    font-size: 2.2rem;
    color: var(--accent);
    margin-bottom: 15px;
}

.consulting-card h3 {
    font-size: 1.6rem;
    margin-bottom: 15px;
    color: var(--text-primary);
    font-weight: bold;
}

.consulting-card p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 20px;
    font-size: 1.05rem;
}

.consulting-card ul {
    list-style: none;
    margin-bottom: 25px;
}

.consulting-card ul li {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.05rem;
    color: var(--text-secondary);
}

.consulting-card ul li i {
    color: var(--success);
}

.verify-box {
    background: rgba(255, 255, 255, 0.6);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid var(--card-border);
}

.verify-box h4 {
    margin-bottom: 10px;
    font-size: 1.1rem;
    color: var(--text-primary);
    font-weight: bold;
}

.verify-input-group {
    display: flex;
    gap: 10px;
}

.verify-input-group input {
    flex-grow: 1;
    background: #ffffff;
    border: 1px solid var(--card-border);
    padding: 10px 15px;
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 1rem;
    font-family: var(--font-main);
}

.verify-result {
    margin-top: 10px;
    font-size: 1rem;
}

/* TESTIMONIALS */
.testimonials-section {
    background: rgba(255, 255, 255, 0.5);
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
}

.testimonial-card {
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.stars {
    color: #d97706;
    margin-bottom: 15px;
    font-size: 1rem;
}

.testimonial-card p {
    color: var(--text-secondary);
    font-size: 1.05rem;
    line-height: 1.6;
    margin-bottom: 20px;
    font-style: italic;
    flex-grow: 1;
}

.client-info {
    display: flex;
    align-items: center;
    gap: 15px;
}

.avatar {
    width: 45px;
    height: 45px;
    background: linear-gradient(135deg, var(--accent), var(--purple));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #fff;
    font-size: 1rem;
}

.client-info h4 {
    font-size: 1.05rem;
    margin-bottom: 2px;
    color: var(--text-primary);
    font-weight: bold;
}

.client-info span {
    font-size: 0.85rem;
    color: var(--text-secondary);
}

/* CONTACT */
.contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 30px;
}

.contact-info-card {
    padding: 40px;
}

.contact-info-card h3 {
    font-size: 1.6rem;
    margin-bottom: 20px;
    color: var(--text-primary);
    font-weight: bold;
}

.contact-info-card p {
    color: var(--text-secondary);
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.05rem;
}

.contact-info-card i {
    color: var(--accent);
    width: 20px;
}

.contact-form {
    padding: 40px;
}

.contact-form h3 {
    font-size: 1.6rem;
    margin-bottom: 20px;
    color: var(--text-primary);
    font-weight: bold;
}

.form-group {
    margin-bottom: 15px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.form-group input, .form-group select, .form-group textarea {
    width: 100%;
    background: #ffffff;
    border: 1px solid var(--card-border);
    padding: 12px 15px;
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 1.05rem;
    font-family: var(--font-main);
}

.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 10px var(--accent-glow);
}

.form-group label {
    display: block;
    font-size: 0.95rem;
    color: var(--text-secondary);
    margin-bottom: 5px;
    font-weight: bold;
}

/* FOOTER */
.footer {
    background: #e2e8f0;
    border-top: 1px solid var(--card-border);
    padding: 60px 0 20px;
}

.footer-content {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 40px;
}

.footer-brand h2 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--accent);
    font-weight: bold;
}

.footer-brand p {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.5;
}

.footer-links h4, .footer-contact h4 {
    font-size: 1.1rem;
    margin-bottom: 15px;
    color: var(--text-primary);
    font-weight: bold;
}

.footer-links a {
    display: block;
    color: var(--text-secondary);
    text-decoration: none;
    margin-bottom: 8px;
    font-size: 1rem;
    transition: color 0.2s;
}

.footer-links a:hover {
    color: var(--accent);
}

.footer-contact p {
    color: var(--text-secondary);
    font-size: 1rem;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.footer-bottom {
    text-align: center;
    border-top: 1px solid var(--card-border);
    padding-top: 20px;
    color: var(--text-secondary);
    font-size: 0.95rem;
}

/* FLOATING REGISTER BUTTON */
.floating-register-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, var(--accent), var(--purple));
    color: #fff;
    border: none;
    padding: 12px 24px;
    border-radius: 30px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 25px var(--accent-glow);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 999;
    animation: pulseGlow 2s infinite;
    transition: transform 0.3s;
    font-family: var(--font-main);
    font-size: 1.05rem;
}

.floating-register-btn:hover {
    transform: scale(1.08);
}

@keyframes pulseGlow {
    0% { box-shadow: 0 0 0 0 rgba(2, 132, 199, 0.4); }
    70% { box-shadow: 0 0 0 15px rgba(2, 132, 199, 0); }
    100% { box-shadow: 0 0 0 0 rgba(2, 132, 199, 0); }
}

/* AI CHATBOT WIDGET */
.chatbot-widget {
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 999;
}

.chatbot-toggle-btn {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--purple), var(--accent));
    border: none;
    border-radius: 50%;
    color: #fff;
    font-size: 1.6rem;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(124, 58, 237, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s;
}

.chatbot-toggle-btn:hover {
    transform: scale(1.1);
}

.chatbot-window {
    position: absolute;
    bottom: 75px;
    left: 0;
    width: 350px;
    height: 480px;
    display: none;
    flex-direction: column;
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.15);
    overflow: hidden;
    z-index: 1000;
    background: #ffffff;
    border: 1px solid var(--card-border);
    border-radius: 16px;
}

.chatbot-window.open {
    display: flex;
}

.chatbot-header {
    background: #e2e8f0;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--card-border);
}

.bot-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.bot-info i {
    font-size: 1.5rem;
    color: var(--accent);
}

.bot-info h4 {
    font-size: 1.05rem;
    color: var(--text-primary);
    font-weight: bold;
}

.bot-info span {
    font-size: 0.85rem;
    color: var(--success);
}

.close-bot {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 1.2rem;
}

.chatbot-messages {
    flex-grow: 1;
    padding: 15px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.message {
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 0.95rem;
    line-height: 1.4;
}

.bot-message {
    background: #f1f5f9;
    color: var(--text-primary);
    align-self: flex-start;
    border-bottom-left-radius: 2px;
}

.user-message {
    background: linear-gradient(135deg, var(--accent), var(--purple));
    color: #fff;
    align-self: flex-end;
    border-bottom-right-radius: 2px;
}

.chatbot-input-area {
    padding: 12px;
    background: #e2e8f0;
    border-top: 1px solid var(--card-border);
    display: flex;
    gap: 8px;
}

.chatbot-input-area input {
    flex-grow: 1;
    background: #ffffff;
    border: 1px solid var(--card-border);
    padding: 8px 12px;
    border-radius: 20px;
    color: var(--text-primary);
    font-size: 0.95rem;
    font-family: var(--font-main);
}

.chatbot-input-area button {
    background: var(--accent);
    border: none;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* MODALS */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(8px);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 20px;
}

.modal-overlay.open {
    display: flex;
}

.modal-content {
    position: relative;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 40px;
    box-shadow: 0 25px 50px rgba(15, 23, 42, 0.2);
    background: #ffffff;
    border: 1px solid var(--card-border);
    border-radius: 16px;
    color: var(--text-primary);
}

.auth-modal-content, .register-modal-content {
    max-width: 500px;
}

.dashboard-modal-content {
    max-width: 900px;
}

.modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(15, 23, 42, 0.05);
    border: none;
    color: var(--text-primary);
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: background 0.2s;
}

.modal-close:hover {
    background: var(--accent);
    color: #fff;
}

/* AUTH TABS */
.auth-tabs {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    background: #f1f5f9;
    padding: 5px;
    border-radius: 12px;
    margin-bottom: 25px;
}

.auth-tab {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    padding: 8px;
    font-size: 0.95rem;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    font-family: var(--font-main);
}

.auth-tab.active {
    background: var(--accent);
    color: #fff;
}

.auth-pane {
    display: none;
}

.auth-pane.active {
    display: block;
}

.auth-links-row {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
}

.auth-links-row a {
    color: var(--accent);
    text-decoration: none;
    font-size: 0.95rem;
}

.otp-timer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    font-size: 0.95rem;
    color: var(--text-secondary);
}

.btn-link {
    background: none;
    border: none;
    color: var(--accent);
    cursor: pointer;
    text-decoration: underline;
    font-size: 0.95rem;
    font-family: var(--font-main);
}

/* DASHBOARD STYLES */
.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--card-border);
    padding-bottom: 20px;
    margin-bottom: 25px;
}

.dashboard-stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}

.dash-card {
    background: #f8fafc;
    border: 1px solid var(--card-border);
    padding: 20px;
    border-radius: 12px;
}

.dash-card h4 {
    font-size: 0.95rem;
    color: var(--text-secondary);
    margin-bottom: 8px;
}

.dash-card h2 {
    font-size: 2rem;
    color: var(--accent);
    font-weight: bold;
}

.attendance-section, .certificate-section, .admin-database-section {
    background: #f8fafc;
    border: 1px solid var(--card-border);
    padding: 25px;
    border-radius: 12px;
    margin-bottom: 20px;
}

.attendance-section h3, .certificate-section h3, .admin-database-section h3 {
    margin-bottom: 15px;
    font-size: 1.2rem;
    color: var(--text-primary);
    font-weight: bold;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
}

.data-table th, .data-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid var(--card-border);
    font-size: 1rem;
    color: var(--text-primary);
}

.data-table th {
    color: var(--text-secondary);
    font-weight: bold;
}

/* RESPONSIVE DESIGN */
@media(max-width: 1024px) {
    .hero-stats-center { grid-template-columns: 1fr; }
    .about-grid, .courses-grid, .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
    .services-grid { grid-template-columns: repeat(2, 1fr); }
    .consulting-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
}

@media(max-width: 768px) {
    .nav-links { display: none; position: absolute; top: 100%; left: 0; width: 100%; background: #ffffff; flex-direction: column; padding: 20px; border-bottom: 1px solid var(--card-border); }
    .nav-links.active { display: flex; }
    .menu-toggle { display: block; }
    .about-grid, .courses-grid, .testimonials-grid, .services-grid { grid-template-columns: 1fr; }
    .hero-content h1 { font-size: 2.3rem; }
    .footer-content { grid-template-columns: 1fr; }
    .auth-tabs { grid-template-columns: repeat(2, 1fr); }
}
