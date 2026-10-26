document.addEventListener('DOMContentLoaded', () => {
    // Menu Dropdown Toggle
    const lmsTriggerBtn = document.getElementById('lmsTriggerBtn');
    const lmsDropdown = document.getElementById('lmsDropdown');
    if (lmsTriggerBtn && lmsDropdown) {
        lmsTriggerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            lmsDropdown.classList.toggle('show');
        });
        document.addEventListener('click', () => {
            lmsDropdown.classList.remove('show');
        });
    }

    // Course Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            courseCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // AI Chatbot Toggle Handling
    const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeBotBtn = document.getElementById('closeBotBtn');
    if (chatbotToggleBtn && chatbotWindow) {
        chatbotToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            chatbotWindow.classList.toggle('open');
        });
        if (closeBotBtn) {
            closeBotBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                chatbotWindow.classList.remove('open');
            });
        }
    }
});

// Scroll to verify section from mobile menu
function scrollToVerify() {
    const section = document.getElementById('verifyBoxSection');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Modal Utilities
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('open');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
}

function openAuthModal(tabName) {
    openModal('authModal');
    switchAuthTab(tabName);
}

function openRegisterModal() {
    openModal('registerModal');
}

function switchAuthTab(tabName) {
    const tabs = document.querySelectorAll('.auth-tab');
    const panes = document.querySelectorAll('.auth-pane');
    
    tabs.forEach(t => {
        if (t.getAttribute('data-tab') === tabName) {
            t.classList.add('active');
        } else {
            t.classList.remove('active');
        }
    });

    panes.forEach(p => p.classList.remove('active'));
    const activePane = document.getElementById('pane-' + tabName);
    if (activePane) activePane.classList.add('active');
}

function toggleConditionalFields() {
    const statusSelect = document.getElementById('currentStatusSelect');
    const condDiv = document.getElementById('studyingConditionalFields');
    if (statusSelect && condDiv) {
        condDiv.style.display = (statusSelect.value === 'Studying') ? 'block' : 'none';
    }
}

// OTP Flow
let otpTimer = null;
let secondsLeft = 120;

function openForgotPasswordModal() {
    closeModal('authModal');
    openModal('forgotModal');
    const step1 = document.getElementById('forgotStep1');
    const step2 = document.getElementById('forgotStep2');
    const step3 = document.getElementById('forgotStep3');
    if (step1) step1.style.display = 'block';
    if (step2) step2.style.display = 'none';
    if (step3) step3.style.display = 'none';
}

function handleSendOtp(e) {
    e.preventDefault();
    document.getElementById('forgotStep1').style.display = 'none';
    document.getElementById('forgotStep2').style.display = 'block';
    startOtpTimer();
}

function startOtpTimer() {
    secondsLeft = 120;
    const timerDisplay = document.getElementById('otpTimerDisplay');
    const resendBtn = document.getElementById('resendOtpBtn');
    if (resendBtn) resendBtn.style.display = 'none';
    if (timerDisplay) timerDisplay.style.display = 'inline';

    if (otpTimer) clearInterval(otpTimer);

    otpTimer = setInterval(() => {
        secondsLeft--;
        let m = Math.floor(secondsLeft / 60);
        let s = secondsLeft % 60;
        if (timerDisplay) {
            timerDisplay.textContent = `Time Remaining: ${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
        }
        if (secondsLeft <= 0) {
            clearInterval(otpTimer);
            if (timerDisplay) timerDisplay.style.display = 'none';
            if (resendBtn) resendBtn.style.display = 'inline';
        }
    }, 1000);
}

function resendOtp() {
    alert("New 4-digit OTP sent successfully! (Simulated OTP: 1234)");
    startOtpTimer();
}

function handleVerifyOtp(e) {
    e.preventDefault();
    const otpInput = document.getElementById('otpInput');
    if (otpInput && otpInput.value === '1234') {
        clearInterval(otpTimer);
        document.getElementById('forgotStep2').style.display = 'none';
        document.getElementById('forgotStep3').style.display = 'block';
    } else {
        alert("Invalid OTP! Please enter 1234 for simulation.");
    }
}

function handleUpdatePassword(e) {
    e.preventDefault();
    alert("Password updated successfully!");
    closeModal('forgotModal');
    openAuthModal('student');
}

function handleLoginSubmit(e, role) {
    e.preventDefault();
    closeModal('authModal');
    renderDashboard(role);
}

function handleAdminLogin(e) {
    e.preventDefault();
    const u = document.getElementById('adminUser').value;
    const p = document.getElementById('adminPass').value;
    if (u === 'admin12345' && p === 'admin12345') {
        closeModal('authModal');
        renderDashboard('admin');
    } else {
        alert("Invalid Admin credentials! Use Username: admin12345 and Password: admin12345");
    }
}

function renderDashboard(role) {
    const content = document.getElementById('dashboardContent');
    if (!content) return;

    if (role === 'student') {
        content.innerHTML = `
            <div class="dashboard-header">
                <div>
                    <h2>Student Dashboard</h2>
                    <p style="color:var(--text-secondary);">Welcome back, Arun Kumar | Course: Artificial Intelligence</p>
                </div>
                <span class="badge" style="background:var(--success); color:#fff;">Active Student</span>
            </div>
            <div class="dashboard-stats-grid">
                <div class="dash-card"><h4>Attendance Rate</h4><h2>94%</h2></div>
                <div class="dash-card"><h4>Course Progress</h4><h2>78%</h2></div>
                <div class="dash-card"><h4>Live Projects</h4><h2>3 Completed</h2></div>
            </div>
            <div class="attendance-section">
                <h3>Daily Attendance Logger</h3>
                <button class="btn btn-primary" type="button" onclick="alert('Attendance marked successfully!')"><i class="fas fa-check"></i> Check-In Today</button>
            </div>
            <div class="certificate-section">
                <h3>Certificate Verification & Download</h3>
                <button class="btn btn-primary" type="button" onclick="alert('Downloading verified certificate PDF...')"><i class="fas fa-download"></i> Download Verified Certificate</button>
            </div>
        `;
    } else if (role === 'staff') {
        content.innerHTML = `
            <div class="dashboard-header">
                <div>
                    <h2>Staff Portal Dashboard</h2>
                    <p style="color:var(--text-secondary);">Welcome, Prof. Rajesh | Department: AI & ML Training</p>
                </div>
                <span class="badge" style="background:var(--purple); color:#fff;">Senior Trainer</span>
            </div>
            <div class="dashboard-stats-grid">
                <div class="dash-card"><h4>Assigned Batches</h4><h2>4 Batches</h2></div>
                <div class="dash-card"><h4>Total Trainees</h4><h2>140 Students</h2></div>
                <div class="dash-card"><h4>Avg. Attendance</h4><h2>91%</h2></div>
            </div>
        `;
    } else if (role === 'admin') {
        content.innerHTML = `
            <div class="dashboard-header">
                <div>
                    <h2>Admin Master Control Dashboard</h2>
                    <p style="color:var(--text-secondary);">SK SMART AI TECHNOLOGIES</p>
                </div>
                <span class="badge" style="background:var(--accent); color:#fff;">Administrator</span>
            </div>
            <div class="dashboard-stats-grid">
                <div class="dash-card"><h4>Total Registrations</h4><h2>1,248</h2></div>
                <div class="dash-card"><h4>Active Courses</h4><h2>12 Programs</h2></div>
                <div class="dash-card"><h4>Database Sync</h4><h2>Google Sheets Connected</h2></div>
            </div>
        `;
    }
    openModal('dashboardModal');
}

function verifyCertificate() {
    const certIdInput = document.getElementById('certIdInput');
    const resultDiv = document.getElementById('verifyResult');
    if (!certIdInput || !resultDiv) return;
    const certId = certIdInput.value.trim();
    if (!certId) {
        resultDiv.innerHTML = `<span style="color:#ef4444;">Please enter a valid Certificate ID.</span>`;
        return;
    }
    resultDiv.innerHTML = `<span style="color:var(--success);"><i class="fas fa-check-circle"></i> Certificate ID <strong>${certId}</strong> is <strong>VERIFIED & AUTHENTIC</strong>. Issued by SK SMART AI TECHNOLOGIES.</span>`;
}

function handleAuthRegisterSubmit(e) {
    e.preventDefault();
    alert("Registration data saved successfully!");
    closeModal('authModal');
}

function handleGeneralRegisterSubmit(e) {
    e.preventDefault();
    alert("Our team will contact you shortly.");
    closeModal('registerModal');
}

function handleContactSubmit(e) {
    e.preventDefault();
    alert("Thank you for contacting SK SMART AI TECHNOLOGIES. We have received your message.");
    e.target.reset();
}

// --- AI Chatbot Logic ---
function handleChatKeyPress(e) {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
}

async function sendChatMessage() {
    const input = document.getElementById('chatUserInput');
    if (!input) return;

    const msgText = input.value.trim();
    if (!msgText) return;

    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;

    // Append User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-message';
    userDiv.textContent = msgText;
    messagesContainer.appendChild(userDiv);
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Append Bot Loading Bubble
    const botDiv = document.createElement('div');
    botDiv.className = 'message bot-message';
    botDiv.textContent = "Thinking...";
    messagesContainer.appendChild(botDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msgText })
        });

        const data = await response.json();
        botDiv.textContent = data.reply || "Welcome to SK SMART AI TECHNOLOGIES. How can we help you advance your career today?";
    } catch (error) {
        botDiv.textContent = "Welcome to SK SMART AI TECHNOLOGIES. How can we assist you with our IT solutions and courses today?";
    }
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
