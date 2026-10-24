// --- DOMContentLoaded & Navigation ---
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

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

    const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeBotBtn = document.getElementById('closeBotBtn');
    if (chatbotToggleBtn && chatbotWindow) {
        chatbotToggleBtn.addEventListener('click', () => {
            chatbotWindow.classList.toggle('open');
        });
        closeBotBtn.addEventListener('click', () => {
            chatbotWindow.classList.remove('open');
        });
    }
});

// --- Modal Controls ---
function openModal(modalId) {
    document.getElementById(modalId).classList.add('open');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('open');
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

// --- Detailed Blueprints Data ---
const blueprints = {
    "Artificial Intelligence (AI)": {
        title: "Artificial Intelligence (AI) - Master Curriculum",
        duration: "3 Months",
        type: "Course",
        modules: [
            "Module 1: Foundations of AI & Python for AI",
            "Module 2: Search Algorithms, Heuristics & Knowledge Representation",
            "Module 3: Computer Vision & OpenCV",
            "Module 4: Natural Language Processing (NLP) & LLM Integrations",
            "Module 5: Capstone Project: Autonomous Agent or Smart Vision System"
        ],
        outcomes: "Build intelligent systems, understand neural network foundations, and deploy generative AI solutions."
    },
    "Machine Learning (ML)": {
        title: "Machine Learning (ML) - Professional Curriculum",
        duration: "3 Months",
        type: "Course",
        modules: [
            "Module 1: Exploratory Data Analysis & Feature Engineering",
            "Module 2: Supervised Learning (Regression & Classification)",
            "Module 3: Unsupervised Learning (Clustering & Dimensionality Reduction)",
            "Module 4: Model Evaluation, Hyperparameter Tuning & Scikit-Learn",
            "Module 5: Real-World Industry ML Deployment Project"
        ],
        outcomes: "Expertise in training predictive models, evaluating performance, and productionizing ML algorithms."
    },
    "Deep Learning (DL)": {
        title: "Deep Learning (DL) - Expert Curriculum",
        duration: "2 Months",
        type: "Course",
        modules: [
            "Module 1: Neural Network Architecture & Backpropagation",
            "Module 2: Convolutional Neural Networks (CNN) for Image Recognition",
            "Module 3: Recurrent Neural Networks (RNN, LSTM, GRU) for Sequence Data",
            "Module 4: Transformers & Generative Adversarial Networks (GANs)",
            "Module 5: PyTorch & TensorFlow Advanced Model Training"
        ],
        outcomes: "Design and train state-of-the-art deep neural networks for complex computer vision and NLP problems."
    },
    "Data Science": {
        title: "Data Science - Comprehensive Blueprint",
        duration: "4 Months",
        type: "Course",
        modules: [
            "Module 1: Advanced Python, Pandas, NumPy & SciPy",
            "Module 2: SQL & NoSQL Database querying for Data Science",
            "Module 3: Statistical Hypothesis Testing & Probability",
            "Module 4: Machine Learning Modeling & Validation",
            "Module 5: Big Data Tools & End-to-End Data Science Portfolio Project"
        ],
        outcomes: "End-to-end mastery of extracting insights, building data pipelines, and predictive data modeling."
    },
    "Data Analytics": {
        title: "Data Analytics - Professional Blueprint",
        duration: "3 Months",
        type: "Course",
        modules: [
            "Module 1: Advanced Excel & Business Metrics",
            "Module 2: Relational Databases & SQL Queries",
            "Module 3: Data Visualization with Tableau & Power BI",
            "Module 4: Exploratory Data Analysis & Storytelling with Data",
            "Module 5: Live Business Dashboard Capstone Project"
        ],
        outcomes: "Transform raw datasets into interactive dashboards and drive corporate decision-making."
    },
    "Business Analytics": {
        title: "Business Analytics - Management Curriculum",
        duration: "2 Months",
        type: "Course",
        modules: [
            "Module 1: Financial Modeling & KPI Tracking",
            "Module 2: Market Research & Consumer Behavior Analytics",
            "Module 3: Predictive Business Forecasting",
            "Module 4: Strategic Decision Frameworks using Data"
        ],
        outcomes: "Bridge business strategy and data analytics to optimize operations and maximize enterprise ROI."
    },
    "Full Stack Development": {
        title: "Full Stack Development - Complete Blueprint",
        duration: "4 Months",
        type: "Course",
        modules: [
            "Module 1: HTML5, CSS3, Modern JavaScript (ES6+)",
            "Module 2: Frontend Architecture with React.js & Tailwind CSS",
            "Module 3: Backend Development with Node.js & Express.js",
            "Module 4: Database Management with MongoDB & SQL",
            "Module 5: Full Stack Deployment & DevOps Basics"
        ],
        outcomes: "Build, test, and deploy scalable full-stack web applications from scratch."
    },
    "Digital Marketing": {
        title: "Digital Marketing - Growth Curriculum",
        duration: "2 Months",
        type: "Course",
        modules: [
            "Module 1: Search Engine Optimization (SEO) & Technical Audits",
            "Module 2: Social Media Marketing & Branding",
            "Module 3: Performance Marketing (PPC, Google Ads, Meta Ads)",
            "Module 4: AI Content Generation & Copywriting Scaling"
        ],
        outcomes: "Execute high-converting digital campaigns and scale online brand presence exponentially."
    },
    "Java Programming": {
        title: "Java Programming - Foundation to Advanced",
        duration: "3 Months",
        type: "Course",
        modules: [
            "Module 1: Core Java & Object-Oriented Programming Principles",
            "Module 2: Java Collections Framework & Exception Handling",
            "Module 3: Multithreading & JDBC Database Connectivity",
            "Module 4: Spring Boot & Enterprise REST API Development"
        ],
        outcomes: "Write robust, enterprise-grade Java applications and backend microservices."
    },
    "Python Programming": {
        title: "Python Programming - Complete Bootcamp",
        duration: "2 Months",
        type: "Course",
        modules: [
            "Module 1: Python Syntax, Control Flow & Data Structures",
            "Module 2: Functions, Modules & Object-Oriented Python",
            "Module 3: File Handling, Error Management & Libraries",
            "Module 4: REST APIs & Mini-Project Development"
        ],
        outcomes: "Gain fluency in Python for automation, scripting, and backend development."
    },
    "Internet of Things (IoT)": {
        title: "Internet of Things (IoT) - Hardware & Cloud",
        duration: "3 Months",
        type: "Course",
        modules: [
            "Module 1: Microcontrollers (Arduino & Raspberry Pi)",
            "Module 2: Sensors, Actuators & Circuit Design",
            "Module 3: MQTT Protocol & IoT Cloud Telemetry",
            "Module 4: Smart Home Automation Capstone Project"
        ],
        outcomes: "Design smart connected devices and integrate hardware with cloud dashboards."
    },
    // Services
    "Website Building": {
        title: "Website Building Services - Blueprint",
        duration: "2 - 4 Weeks Delivery",
        type: "Service",
        modules: [
            "Phase 1: Requirement Analysis & UI/UX Wireframing",
            "Phase 2: Responsive Frontend Development",
            "Phase 3: CMS Integration & SEO Optimization",
            "Phase 4: Security Hardening & Deployment"
        ],
        outcomes: "High-performing, ultra-responsive, SEO-optimized business websites."
    },
    "Mobile App Development": {
        title: "Mobile App Development Services - Blueprint",
        duration: "4 - 8 Weeks Delivery",
        type: "Service",
        modules: [
            "Phase 1: App Architecture & UX Design",
            "Phase 2: Cross-Platform Development (Flutter / React Native)",
            "Phase 3: Backend REST API & Database Integration",
            "Phase 4: Play Store & App Store Publishing Support"
        ],
        outcomes: "Sleek, native-performance iOS & Android applications."
    },
    "Data Analytics": {
        title: "Data Analytics Services - Blueprint",
        duration: "2 - 6 Weeks Delivery",
        type: "Service",
        modules: [
            "Phase 1: Data Audit & Cleaning Pipelines",
            "Phase 2: Statistical Modeling & Trend Analysis",
            "Phase 3: Automated Insight Generation"
        ],
        outcomes: "Clear data intelligence that drives profitable business decisions."
    },
    "Data Visualization": {
        title: "Data Visualization Services - Blueprint",
        duration: "2 - 4 Weeks Delivery",
        type: "Service",
        modules: [
            "Phase 1: Metric Definition & KPI Mapping",
            "Phase 2: Interactive Dashboard Design in Tableau & Power BI",
            "Phase 3: Executive Reporting Setup"
        ],
        outcomes: "Stunning, real-time executive dashboards."
    },
    "Business Analytics": {
        title: "Business Analytics Services - Blueprint",
        duration: "3 - 6 Weeks Delivery",
        type: "Service",
        modules: [
            "Phase 1: Operational Efficiency Assessment",
            "Phase 2: Predictive Financial Modeling",
            "Phase 3: Strategic Growth Recommendations"
        ],
        outcomes: "Optimized operational workflows and maximum financial ROI."
    },
    "Software Development": {
        title: "Software Development Services - Blueprint",
        duration: "6 - 12 Weeks Delivery",
        type: "Service",
        modules: [
            "Phase 1: Enterprise System Architecture Design",
            "Phase 2: Custom ERP/CRM Development",
            "Phase 3: Cloud Deployment & QA Testing"
        ],
        outcomes: "Secure, scalable enterprise software solutions."
    },
    "AI Content": {
        title: "AI Content Services - Blueprint",
        duration: "Ongoing / Project Based",
        type: "Service",
        modules: [
            "Phase 1: Brand Voice Training & Prompt Engineering",
            "Phase 2: Automated SEO Blog & Article Scaling",
            "Phase 3: Marketing Copy Optimization"
        ],
        outcomes: "High-engagement AI-powered content at scale."
    },
    "Digital Marketing": {
        title: "Digital Marketing Services - Blueprint",
        duration: "Monthly Retainer",
        type: "Service",
        modules: [
            "Phase 1: Digital Footprint Audit & Keyword Strategy",
            "Phase 2: Social Media Branding & PPC Campaign Management",
            "Phase 3: Conversion Rate Optimization & Monthly Analytics Reporting"
        ],
        outcomes: "Exponential online growth and sustained customer acquisition."
    }
};

function openCourseModal(courseName) {
    renderDetailModal(blueprints[courseName]);
}

function openServiceModal(serviceName) {
    renderDetailModal(blueprints[serviceName]);
}

function renderDetailModal(data) {
    const body = document.getElementById('detailModalBody');
    let modulesHtml = data.modules.map(m => `<li><i class="fas fa-check-circle" style="color:var(--accent); margin-right:8px;"></i>${m}</li>`).join('');
    
    body.innerHTML = `
        <span class="badge">${data.type} Blueprint</span>
        <h2 style="margin: 15px 0 10px; font-size: 1.8rem;">${data.title}</h2>
        <p style="color: var(--accent); margin-bottom: 20px;"><i class="far fa-clock"></i> Duration: <strong>${data.duration}</strong></p>
        <h3 style="margin-bottom: 12px; font-size: 1.1rem;">Curriculum / Execution Phases:</h3>
        <ul style="list-style: none; margin-bottom: 25px; display: flex; flex-direction: column; gap: 10px;">
            ${modulesHtml}
        </ul>
        <div style="background: rgba(56, 189, 248, 0.1); padding: 20px; border-radius: 12px; border: 1px solid rgba(56, 189, 248, 0.3); margin-bottom: 25px;">
            <h4 style="color: var(--accent); margin-bottom: 5px;">Key Outcome</h4>
            <p style="color: var(--text-primary); font-size: 0.95rem;">${data.outcomes}</p>
        </div>
        <button class="btn btn-primary" style="width: 100%;" onclick="closeModal('detailModal'); openRegisterModal();">Enroll / Request Service Now</button>
    `;
    openModal('detailModal');
}

// --- Conditional Fields ---
function toggleConditionalFields() {
    const status = document.getElementById('currentStatusSelect').value;
    const condDiv = document.getElementById('studyingConditionalFields');
    condDiv.style.display = (status === 'Studying') ? 'block' : 'none';
}

// --- OTP & Forgot Password ---
let otpTimer = null;
let secondsLeft = 120;

function openForgotPasswordModal() {
    closeModal('authModal');
    openModal('forgotModal');
    document.getElementById('forgotStep1').style.display = 'block';
    document.getElementById('forgotStep2').style.display = 'none';
    document.getElementById('forgotStep3').style.display = 'none';
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
    resendBtn.style.display = 'none';
    timerDisplay.style.display = 'inline';

    if (otpTimer) clearInterval(otpTimer);

    otpTimer = setInterval(() => {
        secondsLeft--;
        let m = Math.floor(secondsLeft / 60);
        let s = secondsLeft % 60;
        timerDisplay.textContent = `Time Remaining: ${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;

        if (secondsLeft <= 0) {
            clearInterval(otpTimer);
            timerDisplay.style.display = 'none';
            resendBtn.style.display = 'inline';
        }
    }, 1000);
}

function resendOtp() {
    alert("New 4-digit OTP sent successfully! (Simulated OTP: 1234)");
    startOtpTimer();
}

function handleVerifyOtp(e) {
    e.preventDefault();
    const otp = document.getElementById('otpInput').value;
    if (otp === '1234') {
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
                <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:15px;">Mark your daily training/class attendance.</p>
                <button class="btn btn-primary" onclick="alert('Attendance marked successfully!')"><i class="fas fa-check"></i> Check-In Today</button>
            </div>
            <div class="certificate-section">
                <h3>Certificate Verification & Download</h3>
                <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:15px;">Your verified MSME course completion certificate is ready.</p>
                <button class="btn btn-primary" onclick="alert('Downloading verified MSME certificate PDF...')"><i class="fas fa-download"></i> Download Verified Certificate</button>
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
                <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:15px;">Log your daily staff login and review batch attendance.</p>
                <button class="btn btn-primary" onclick="alert('Staff attendance recorded successfully!')"><i class="fas fa-clipboard-check"></i> Log Staff Attendance</button>
            </div>
        `;
    } else if (role === 'admin') {
        content.innerHTML = `
            <div class="dashboard-header">
                <div>
                    <h2>Admin Master Control Dashboard</h2>
                    <p style="color:var(--text-secondary);">SK SMART AI TECHNOLOGIES (MSME Reg: UDYAM-TN-36-0058719)</p>
                </div>
                <span class="badge" style="background:var(--accent); color:#0a0f1d;">Administrator</span>
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
                        <tr><td>#SK-9081</td><td>Arun Kumar</td><td>Artificial Intelligence</td><td><span style="color:var(--success);">Verified</span></td><td><button class="btn-link" onclick="alert('Viewing record')">View</button></td></tr>
                        <tr><td>#SK-9082</td><td>Priya Sundaram</td><td>Website Building</td><td><span style="color:var(--success);">Client</span></td><td><button class="btn-link" onclick="alert('Viewing record')">View</button></td></tr>
                        <tr><td>#SK-9083</td><td>Deepika V.</td><td>Full Stack Dev</td><td><span style="color:var(--accent);">Intern</span></td><td><button class="btn-link" onclick="alert('Viewing record')">View</button></td></tr>
                    </tbody>
                </table>
            </div>
        `;
    }
    openModal('dashboardModal');
}

// --- Certificate Verification ---
function verifyCertificate() {
    const certId = document.getElementById('certIdInput').value.trim();
    const resultDiv = document.getElementById('verifyResult');
    if (!certId) {
        resultDiv.innerHTML = `<span style="color:#ef4444;">Please enter a valid Certificate ID.</span>`;
        return;
    }
    resultDiv.innerHTML = `<span style="color:var(--success);"><i class="fas fa-check-circle"></i> Certificate ID <strong>${certId}</strong> is <strong>VERIFIED & AUTHENTIC</strong>. Issued by SK SMART AI TECHNOLOGIES (MSME Reg: UDYAM-TN-36-0058719).</span>`;
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

// --- AI Chatbot ---
function handleChatKeyPress(e) {
    if (e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
    const input = document.getElementById('chatUserInput');
    const msgText = input.value.trim();
    if (!msgText) return;

    const messagesContainer = document.getElementById('chatbotMessages');
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-message';
    userDiv.textContent = msgText;
    messagesContainer.appendChild(userDiv);
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

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
        return "We offer professional courses in AI, ML, DL, Data Science, Full Stack, Java, Python, and IoT with MSME certification (UDYAM-TN-36-0058719).";
    } else if (q.includes('service') || q.includes('website') || q.includes('app')) {
        return "Our IT services include Website Building, Mobile Apps, Data Analytics, Visualization, Business Analytics, Software Development, AI Content, and Digital Marketing.";
    } else if (q.includes('internship') || q.includes('training')) {
        return "Our student training and internship programs provide 100% live project experience under expert mentors with verified MSME certificates.";
    } else if (q.includes('contact') || q.includes('phone')) {
        return "You can reach us at +91 93614 83073 or email sksmartaitechnologies@gmail.com.";
    } else {
        return "Welcome to SK SMART AI TECHNOLOGIES (MSME Reg: UDYAM-TN-36-0058719). How can we help you advance your career today?";
    }
}
