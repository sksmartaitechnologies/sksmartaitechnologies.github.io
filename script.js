// --- DOMContentLoaded & Navigation Setup ---
document.addEventListener('DOMContentLoaded', () => {
    // Menu Dropdown Toggle (Menu Button)
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

// --- Modal Utilities ---
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
    }
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
    if (activePane) {
        activePane.classList.add('active');
    }
}

// --- Conditional Fields for Registration ---
function toggleConditionalFields() {
    const statusSelect = document.getElementById('currentStatusSelect');
    const condDiv = document.getElementById('studyingConditionalFields');
    if (statusSelect && condDiv) {
        condDiv.style.display = (statusSelect.value === 'Studying') ? 'block' : 'none';
    }
}

// --- OTP & Forgot Password Flow ---
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
    const step1 = document.getElementById('forgotStep1');
    const step2 = document.getElementById('forgotStep2');
    if (step1) step1.style.display = 'none';
    if (step2) step2.style.display = 'block';
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
        const step2 = document.getElementById('forgotStep2');
        const step3 = document.getElementById('forgotStep3');
        if (step2) step2.style.display = 'none';
        if (step3) step3.style.display = 'block';
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

// --- Login & Dashboards ---
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
                <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:15px;">Mark your daily training/class attendance.</p>
                <button class="btn btn-primary" type="button" onclick="alert('Attendance marked successfully!')"><i class="fas fa-check"></i> Check-In Today</button>
            </div>
            <div class="certificate-section">
                <h3>Certificate Verification & Download</h3>
                <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:15px;">Your verified course completion certificate is ready.</p>
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
            <div class="attendance-section">
                <h3>Staff Attendance Tracker</h3>
                <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:15px;">Log your daily staff login and review batch attendance.</p>
                <button class="btn btn-primary" type="button" onclick="alert('Staff attendance recorded successfully!')"><i class="fas fa-clipboard-check"></i> Log Staff Attendance</button>
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
                <div class="dash-card"><h4>Active Courses</h4><h2>11 Programs</h2></div>
                <div class="dash-card"><h4>Database Sync</h4><h2>Google Sheets Connected</h2></div>
            </div>
            <div class="admin-database-section">
                <h3>Recent Database Records & Submissions</h3>
                <table class="data-table">
                    <thead>
                        <tr><th>ID</th><th>Name</th><th>Role / Course</th><th>Status</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>#SK-9081</td><td>Arun Kumar</td><td>Artificial Intelligence</td><td><span style="color:var(--success);">Verified</span></td><td><button class="btn-link" type="button" onclick="alert('Viewing record')">View</button></td></tr>
                        <tr><td>#SK-9082</td><td>Priya Sundaram</td><td>Website Building</td><td><span style="color:var(--success);">Client</span></td><td><button class="btn-link" type="button" onclick="alert('Viewing record')">View</button></td></tr>
                        <tr><td>#SK-9083</td><td>Deepika V.</td><td>Full Stack Dev</td><td><span style="color:var(--accent);">Intern</span></td><td><button class="btn-link" type="button" onclick="alert('Viewing record')">View</button></td></tr>
                    </tbody>
                </table>
            </div>
        `;
    }
    openModal('dashboardModal');
}

// --- Certificate Verification ---
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

// --- General Submissions ---
function handleAuthRegisterSubmit(e) {
    e.preventDefault();
    alert("Registration data saved successfully! Simulated integration with Google Sheets completed.");
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

function sendChatMessage() {
    const input = document.getElementById('chatUserInput');
    if (!input) return;

    const msgText = input.value.trim();
    if (!msgText) return;

    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;

    // Append user message
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-message';
    userDiv.textContent = msgText;
    messagesContainer.appendChild(userDiv);
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate AI bot response
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'message bot-message';
        botDiv.textContent = generateBotResponse(msgText);
        messagesContainer.appendChild(botDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 600);
}

function generateBotResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('course') || q.includes('ai') || q.includes('python')) {
        return "We offer professional courses in AI, ML, DL, Data Science, Full Stack, Java, Python, and IoT.";
    } else if (q.includes('service') || q.includes('website') || q.includes('app')) {
        return "Our IT Solution services include Website Building, Mobile Apps, Data Analytics, Visualization, Business Analytics, Software Development, AI Content, and Digital Marketing.";
    } else if (q.includes('internship') || q.includes('training')) {
        return "Our student training and internship programs provide 100% live project experience under expert mentors.";
    } else if (q.includes('contact') || q.includes('phone')) {
        return "You can reach us at +91 93614 83073 or email sksmartaitechnologies@gmail.com.";
    } else {
        return "Welcome to SK SMART AI TECHNOLOGIES. How can we help you advance your career today?";
    }
}
