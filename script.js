// Google Cloud Sheet ID reference for credential verification
const GOOGLE_SHEET_ID = "1s90ibbiPYos-cEapdJlO4g8J67AmhVqehllCXZKhw_w";

// Institutional Programs Catalog (Categorized)
const courseData = [
    { title: "Artificial Intelligence", category: "ai", desc: "Master advanced Neural Networks, Natural Language Processing, and Vision pipelines.\nDeploy production-ready predictive models across secure cloud environments." },
    { title: "Machine Learning", category: "ai", desc: "Build predictive engines using robust supervised and unsupervised learning algorithms.\nOptimize complex statistical data modeling pathways for strategic enterprise execution." },
    { title: "Deep Learning (DL)", category: "ai", desc: "Study complex neural network layers and state-of-the-art computational graphs.\nTrain generative architectures and deep computational models for multi-dimensional data." },
    { title: "Data Science", category: "ai", desc: "Architect data preprocessing pipelines and feature engineering workflows.\nFormulate Business Intelligence strategies leveraging modern visualization models." },
    { title: "Cyber Security", category: "security", desc: "Implement defensive operations using cutting-edge ethical hacking frameworks.\nSecure distributed networks against zero-day threat vectors and unauthorized intrusions." },
    { title: "Blockchain Tech", category: "security", desc: "Develop secure distributed ledger layers using smart contracts and consensus algorithms.\nArchitect decentralized applications for high-throughput trust verification." },
    { title: "Python Programming", category: "dev", desc: "Master object-oriented system architectures and automation scripts.\nBuild microservice logical engines utilizing performant computational libraries." },
    { title: "Power BI & Tableau", category: "finance", desc: "Design interactive corporate dashboard configurations and live connections.\nTranslate tabular analytical sets into scalable operational decision panels." },
    { title: "Java Programming", category: "dev", desc: "Engineer enterprise software using clean object-oriented design and multi-threading.\nDevelop platform-independent application layers backed by structural database interfaces." },
    { title: "Cloud Computing", category: "security", desc: "Architect serverless computing infrastructures and multi-zone deployment matrices.\nManage application layers across secure virtualization networks." },
    { title: "Internet of Things", category: "dev", desc: "Design smart connected node network architectures.\nDeploy sensory grid environments backed by robust edge analytics computing." },
    { title: "Embedded IoT", category: "dev", desc: "Program microcontrollers and low-level operational firmware protocols.\nOptimize hardware telemetry streams with low-latency communication channels." },
    { title: "Financial Analyst", category: "finance", desc: "Master corporate valuation models and macroeconomic indicators.\nPerform equity research alongside quantitative portfolio tracking algorithms." },
    { title: "Digital Marketing", category: "finance", desc: "Build ROI-focused multi-channel consumer engagement campaigns.\nLeverage web analytics architectures and automated funnel optimizations." },
    { title: "Financial Data Engineering", category: "finance", desc: "Architect time-series pipelines for high-frequency market data ticks.\nOptimize relational data stores utilizing specialized Python analytics libraries." },
    { title: "Banking Analytics & Risk", category: "finance", desc: "Deploy classification models to predict loan default metrics.\nBuild real-time anomaly detection pipelines to mitigate operational exposure." },
    { title: "Next-Gen FinTech", category: "finance", desc: "Develop secure distributed ledger layers for investment clearing networks.\nImplement automated smart contracts and intelligent OCR banking engines." },
    { title: "Data Analytics", category: "ai", desc: "Translate historical metrics into clear corporate strategy trends.\nBuild structured database layers alongside enterprise-level visual analytics." },
    { title: "Data Engineer", category: "ai", desc: "Construct multi-gigabyte ingestion networks and data transformations.\nMaintain low-latency server configurations for enterprise engineering models." },
    { title: "Full Stack Development", category: "dev", desc: "Engineer responsive client-side interfaces and modular user flows.\nDeploy scalable backend APIs backed by cloud deployment strategies." },
    { title: "Modern Web Development", category: "dev", desc: "Design responsive grid applications with fluid typography and layout rules.\nImplement performant data fetching mechanisms using vanilla engine frameworks." }
];

let currentFilter = 'all';

// Initialize Layout, Filters, and Observers
document.addEventListener("DOMContentLoaded", () => {
    initCanvasParticles();
    renderCourseGrid(courseData);
    initStatsObserver();

    // Check URL parameters for direct verification queries
    const urlParams = new URLSearchParams(window.location.search);
    const certIdFromUrl = urlParams.get('id');
    if (certIdFromUrl) {
        const verifySection = document.getElementById('verify');
        if (verifySection) verifySection.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('certId').value = certIdFromUrl;
        setTimeout(() => { manualVerify(); }, 400);
    }
});

// Render Program Cards
function renderCourseGrid(list) {
    const mainGrid = document.getElementById('mainGrid');
    if (!mainGrid) return;
    
    if (list.length === 0) {
        mainGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No programs found matching criteria.</div>`;
        return;
    }

    mainGrid.innerHTML = list.map(c => `
        <div class="card course-card">
            <span class="badge">${getCategoryName(c.category)}</span>
            <h3>${c.title}</h3>
            <p>${c.desc.replace(/\n/g, '<br>')}</p>
            <div class="course-footer">
                <span><i class="fas fa-layer-group"></i> Project-Based</span>
                <span>Verified Certificate <i class="fas fa-arrow-right"></i></span>
            </div>
        </div>
    `).join('');
}

function getCategoryName(cat) {
    switch (cat) {
        case 'ai': return 'AI & Data';
        case 'dev': return 'Software & Web';
        case 'security': return 'Cloud & Security';
        case 'finance': return 'FinTech & Analytics';
        default: return 'Specialization';
    }
}

// Course Filters
function setCategory(cat, element) {
    currentFilter = cat;
    document.querySelectorAll('.filter-chip').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    filterCourses();
}

function filterCourses() {
    const query = document.getElementById('courseSearch').value.toLowerCase().trim();
    const filtered = courseData.filter(c => {
        const matchesCategory = (currentFilter === 'all') || (c.category === currentFilter);
        const matchesQuery = c.title.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query);
        return matchesCategory && matchesQuery;
    });
    renderCourseGrid(filtered);
}

// Responsive Navbar Toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('open');
}

// Animated Stat Counters
function initStatsObserver() {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;

    let executed = false;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !executed) {
            executed = true;
            document.querySelectorAll('.metric-number').forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'), 10);
                let current = 0;
                const increment = Math.ceil(target / 45);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.innerText = target;
                        clearInterval(timer);
                    } else {
                        counter.innerText = current;
                    }
                }, 30);
            });
        }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
}

// Interactive Certificate Verification
function manualVerify() {
    const idInput = document.getElementById('certId');
    const id = idInput.value.trim();
    const resultDiv = document.getElementById('verifyResult');

    if (!id) {
        resultDiv.innerHTML = `<div style="color: #ef4444; margin-top: 15px; font-weight: 600;"><i class="fas fa-triangle-exclamation"></i> Please input a valid Certificate ID.</div>`;
        return;
    }

    resultDiv.innerHTML = `
        <div style="color: var(--gold); margin-top: 20px; font-weight: 600;">
            <i class="fas fa-circle-notch fa-spin"></i> Contacting Decentralized Ledger Records...
        </div>`;

    const targetUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json`;

    fetch(targetUrl)
        .then(res => res.text())
        .then(data => {
            const tempJson = JSON.parse(data.substr(47).slice(0, -2));
            const rows = tempJson.table.rows;
            let record = null;

            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].c;
                if (cells && cells[0] && cells[0].v && cells[0].v.toString().trim().toLowerCase() === id.toLowerCase()) {
                    record = {
                        id: cells[0].v,
                        name: cells[1] ? cells[1].v : "N/A",
                        course: cells[2] ? cells[2].v : "N/A",
                        date: cells[3] ? cells[3].v : "N/A"
                    };
                    break;
                }
            }

            if (record) {
                resultDiv.innerHTML = `
                    <div class="verify-badge-card">
                        <div class="verify-header">
                            <div>
                                <span class="verify-id-pill">${record.id}</span>
                                <h3 style="margin-top: 8px; color: #4ade80;"><i class="fas fa-circle-check"></i> Certified Credential</h3>
                            </div>
                            <i class="fas fa-shield-halved" style="font-size: 2.2rem; color: var(--gold);"></i>
                        </div>
                        <div class="verify-field">
                            <label>Candidate Name</label>
                            <div>${record.name}</div>
                        </div>
                        <div class="verify-field">
                            <label>Specialization Completed</label>
                            <div>${record.course}</div>
                        </div>
                        <div class="verify-field">
                            <label>Issuance & Completion Date</label>
                            <div>${record.date}</div>
                        </div>
                    </div>`;
            } else {
                resultDiv.innerHTML = `
                    <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); padding: 15px; border-radius: 10px; color: #f87171; margin-top: 20px;">
                        <i class="fas fa-circle-xmark"></i> Verification Failed: No active credentials found matching "<strong>${id}</strong>".
                    </div>`;
            }
        })
        .catch(err => {
            console.error("Cloud Connection Exception:", err);
            resultDiv.innerHTML = `
                <div style="color: #ef4444; margin-top: 20px; font-weight: 600;">
                    <i class="fas fa-triangle-exclamation"></i> Database Offline. Ensure the reference spreadsheet has link-sharing set to "Anyone with the link".
                </div>`;
        });
}

// Authentication Modal Logic
let currentPortalType = "";

function togglePasswordVisibility(id, icon) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
        input.type = "password";
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    }
}

function openLogin(type) {
    currentPortalType = type;
    document.getElementById('modalTitle').innerText = `${type} Portal Authentication`;
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('portalPass').value = '';
}

function checkPass() {
    const pass = document.getElementById('portalPass').value;
    // Client-side authentication wrapper
    if (currentPortalType === 'Admin' && pass === "santhassk") {
        closeLogin();
        showAdminPanel();
    } else if (currentPortalType === 'Staff' && pass === "SKAITECH2026") {
        closeLogin();
        showUserPortal('Staff');
    } else if (currentPortalType === 'Student' && pass === "skaistudent") {
        closeLogin();
        showUserPortal('Student');
    } else {
        alert("Authentication failed: Invalid credentials.");
    }
}

function showUserPortal(type) {
    const panel = document.getElementById('userDashboard');
    panel.style.display = 'block';
    panel.innerHTML = `
        <div class="attendance-card">
            <h2 class="accent">${type} Check-In</h2>
            <p style="margin: 15px 0 25px; color: var(--text-muted);">Secure digital attendance timestamp.</p>
            <input type="text" id="userName" placeholder="Type your full registered name">
            <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="markAttendance('${type}')">Record Status</button>
            <button class="btn-secondary" style="width: 100%; margin-top: 12px; justify-content: center;" onclick="location.reload()">Exit Portal</button>
        </div>`;
}

function markAttendance(type) {
    const name = document.getElementById('userName').value.trim();
    if (!name) return alert("Please enter your name.");
    alert(`Attendance marked successfully for ${name} [${type}].`);
    location.reload();
}

function showAdminPanel() {
    const panel = document.getElementById('adminDashboard');
    panel.style.display = 'block';
    panel.innerHTML = `
        <div class="container">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h2 class="accent">Administrative Operations</h2>
                <button class="btn-secondary" onclick="location.reload()">Exit Console</button>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 20px;">Use cloud sheet direct link to edit active verification records and manage roles.</p>
            <button class="btn-primary" onclick="window.open('https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}', '_blank')">
                <i class="fas fa-arrow-up-right-from-square"></i> Open Google Cloud Sheet
            </button>
        </div>`;
}

// Background Neural Particle Visualizer
function initCanvasParticles() {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor(width / 18), 65);

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 2 + 1
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(212, 175, 55, ${0.25 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(render);
    }
    render();
}
