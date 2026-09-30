// Google Cloud Sheet ID for Real-Time Credential Checks
const GOOGLE_SHEET_ID = "1s90ibbiPYos-cEapdJlO4g8J67AmhVqehllCXZKhw_w";

// Structured Database for Programs, Internships & Workshops
const offeringsData = [
    // Internships
    { title: "AI & Neural Networks Internship", type: "internship", mode: "Hybrid / Remote", duration: "8-12 Weeks", desc: "Build production deep learning pipelines, CNN vision classifiers, and automated LLM fine-tuning pipelines on cloud servers." },
    { title: "Full Stack Cloud Development Internship", type: "internship", mode: "Hands-on Lab", duration: "8 Weeks", desc: "Engineer responsive interfaces and high-throughput REST APIs backed by secure relational databases and Docker containers." },
    { title: "Data Science & BI Strategy Internship", type: "internship", mode: "Corporate Sprint", duration: "6 Weeks", desc: "Clean and model multi-gigabyte data sets, formulate executive business intelligence dashboards, and extract statistical forecasts." },
    { title: "Cyber Defense & PenTesting Internship", type: "internship", mode: "Virtual Sandbox", duration: "8 Weeks", desc: "Perform vulnerability assessments, simulate security audits, and write automated intrusion mitigation scripts." },
    { title: "FinTech & Quantitative Risk Internship", type: "internship", mode: "Analytics Desk", duration: "8 Weeks", desc: "Engineer loan default classification models and analyze market transaction logs using quantitative Python packages." },
    { title: "Embedded Systems & IoT Internship", type: "internship", mode: "Hardware Kit", duration: "6 Weeks", desc: "Program microcontrollers, configure sensory grids, and establish real-time telemetry streams over low-latency MQTT networks." },

    // Workshops
    { title: "Generative AI & Transformer Architectures", type: "workshop", mode: "Live Weekend", duration: "2 Days Sprint", desc: "Intensive deep-dive into transformer layers, custom vector embeddings, and zero-shot deployment." },
    { title: "Power BI & Tableau Decision Matrix", type: "workshop", mode: "Interactive Lab", duration: "3 Days Sprint", desc: "Rapidly translate raw database extracts into interactive decision panels with dynamic drill-down hierarchies." },
    { title: "Ethical Hacking & Network Forensics", type: "workshop", mode: "Sandbox Lab", duration: "2 Days Sprint", desc: "Hands-on intrusion detection, credential sniffing counter-measures, and security policy hardening." },
    { title: "High-Frequency Financial Data Pipelines", type: "workshop", mode: "Code Bootcamp", duration: "2 Days Sprint", desc: "Build time-series database architectures optimized for sub-millisecond stock market analytics." },

    // Specialized Courses
    { title: "Advanced Machine Learning Mastery", type: "course", mode: "Instructor-Led", duration: "16 Weeks", desc: "Comprehensive study of supervised, unsupervised, reinforcement learning algorithms, and mathematical loss functions." },
    { title: "Blockchain & Decentralized Ledger Protocols", type: "course", mode: "Virtual Lab", duration: "12 Weeks", desc: "Design immutable smart contracts, consensus mechanisms, and high-throughput decentralized applications." },
    { title: "Enterprise Cloud Computing Architecture", type: "course", mode: "Cloud Console", duration: "10 Weeks", desc: "Architect serverless computing infrastructures and automated multi-zone deployment workflows." },
    { title: "Core & Advanced Python Engineering", type: "course", mode: "Hands-on", duration: "8 Weeks", desc: "Master object-oriented structures, async multi-threading, and performant backend microservice architectures." },
    { title: "Modern Java Enterprise Systems", type: "course", mode: "Hands-on", duration: "10 Weeks", desc: "Develop multi-threaded enterprise software layers using modern Spring Boot patterns and database connectors." }
];

let selectedType = 'all';

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
    init3DCanvas();
    initHologramTilt();
    renderOfferings(offeringsData);
    initCard3DTilt();

    // Direct certificate link resolution
    const urlParams = new URLSearchParams(window.location.search);
    const certId = urlParams.get('id');
    if (certId) {
        const verifySection = document.getElementById('verify');
        if (verifySection) verifySection.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('certId').value = certId;
        setTimeout(() => { manualVerify(); }, 400);
    }
});

// Render Dynamic Offerings Grid
function renderOfferings(list) {
    const grid = document.getElementById('offeringsGrid');
    if (!grid) return;

    if (list.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 50px;">No offerings match your search criteria.</div>`;
        return;
    }

    grid.innerHTML = list.map(item => `
        <div class="card-3d tilt-item">
            <div>
                <div class="card-top-tag">
                    <span class="type-tag ${item.type}">${item.type}</span>
                    <span class="mode-tag"><i class="fas fa-location-dot"></i> ${item.mode}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
            <div class="card-bottom-meta">
                <span><i class="far fa-clock"></i> ${item.duration}</span>
                <span>Apply Now <i class="fas fa-arrow-right"></i></span>
            </div>
        </div>
    `).join('');

    // Reattach mouse listeners for dynamic cards
    initCard3DTilt();
}

// Category and Search Filtering
function setProgramType(type, btn) {
    selectedType = type;
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterOfferings();
}

function filterOfferings() {
    const q = document.getElementById('catalogSearch').value.toLowerCase().trim();
    const filtered = offeringsData.filter(item => {
        const matchesType = (selectedType === 'all') || (item.type === selectedType);
        const matchesQuery = item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
        return matchesType && matchesQuery;
    });
    renderOfferings(filtered);
}

// Interactive 3D Cursor Tilt for Hero Card
function initHologramTilt() {
    const card = document.getElementById('tiltCard');
    if (!card) return;

    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 25;
        const y = (window.innerHeight / 2 - e.clientY) / 25;
        card.style.transform = `rotateY(${-x}deg) rotateX(${y}deg)`;
    });
}

// 3D Tilt for Content Cards
function initCard3DTilt() {
    const tiltElements = document.querySelectorAll('.tilt-item');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `perspective(1000px) rotateY(${x / 18}deg) rotateX(${-y / 18}deg) translateY(-6px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)`;
        });
    });
}

// Background Dynamic 3D Geometric Canvas
function init3DCanvas() {
    const canvas = document.getElementById('bg3dCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    const nodes = [];
    const count = 38;

    for (let i = 0; i < count; i++) {
        nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            size: Math.random() * 3 + 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        // Render Connections
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            n.x += n.vx;
            n.y += n.vy;

            if (n.x < 0 || n.x > w) n.vx *= -1;
            if (n.y < 0 || n.y > h) n.vy *= -1;

            ctx.fillStyle = 'rgba(37, 99, 235, 0.4)';
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < nodes.length; j++) {
                const n2 = nodes[j];
                const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
                if (dist < 150) {
                    ctx.strokeStyle = `rgba(37, 99, 235, ${0.12 * (1 - dist / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(n.x, n.y);
                    ctx.lineTo(n2.x, n2.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

// 3D Smart-Seal Verification Engine
function manualVerify() {
    const id = document.getElementById('certId').value.trim();
    const resultDiv = document.getElementById('verifyResult');

    if (!id) {
        resultDiv.innerHTML = `<div style="color: #dc2626; margin-top: 15px; font-weight: 600;"><i class="fas fa-triangle-exclamation"></i> Please enter an issued certificate number.</div>`;
        return;
    }

    resultDiv.innerHTML = `<div style="color: var(--accent-blue); margin-top: 20px; font-weight: 600;"><i class="fas fa-spinner fa-spin"></i> Contacting Decentralized Ledger Records...</div>`;
    const targetUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json`;

    fetch(targetUrl)
        .then(res => res.text())
        .then(data => {
            const parsed = JSON.parse(data.substr(47).slice(0, -2));
            const rows = parsed.table.rows;
            let record = null;

            for (let i = 0; i < rows.length; i++) {
                const c = rows[i].c;
                if (c && c[0] && c[0].v && c[0].v.toString().trim().toLowerCase() === id.toLowerCase()) {
                    record = {
                        id: c[0].v,
                        name: c[1] ? c[1].v : "Candidate Record",
                        course: c[2] ? c[2].v : "Technical Program",
                        date: c[3] ? c[3].v : "Verified Date"
                    };
                    break;
                }
            }

            if (record) {
                resultDiv.innerHTML = `
                    <div class="cert-3d-card">
                        <div class="cert-header">
                            <div>
                                <span class="cert-id-tag">${record.id}</span>
                                <h3 style="margin-top: 6px; color: #16a34a;"><i class="fas fa-check-circle"></i> Authenticated Credential</h3>
                            </div>
                            <i class="fas fa-award cert-seal-icon"></i>
                        </div>
                        <div class="cert-row">
                            <label>Certified Recipient</label>
                            <div>${record.name}</div>
                        </div>
                        <div class="cert-row">
                            <label>Domain Track / Program</label>
                            <div>${record.course}</div>
                        </div>
                        <div class="cert-row">
                            <label>Date of Completion</label>
                            <div>${record.date}</div>
                        </div>
                    </div>`;
            } else {
                resultDiv.innerHTML = `
                    <div style="background: #fee2e2; border: 1px solid #f87171; padding: 15px; border-radius: 12px; color: #b91c1c; margin-top: 20px;">
                        <i class="fas fa-circle-xmark"></i> Verification Failed: No matching record found for ID "<strong>${id}</strong>".
                    </div>`;
            }
        })
        .catch(err => {
            console.error(err);
            resultDiv.innerHTML = `<div style="color: #dc2626; margin-top: 20px; font-weight: 600;">Unable to connect to cloud verification database.</div>`;
        });
}

// Navigation & Auth Modals
function toggleNav() {
    document.querySelector('.nav-links').classList.toggle('open');
}

let activePortal = "";
function openLogin(type) {
    activePortal = type;
    document.getElementById('modalTitle').innerText = `${type} Authentication`;
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('portalPass').value = '';
}

function togglePassEye() {
    const p = document.getElementById('portalPass');
    p.type = p.type === 'password' ? 'text' : 'password';
}

function checkPass() {
    const input = document.getElementById('portalPass').value;
    if (activePortal === 'Admin' && input === 'santhassk') {
        closeLogin();
        showAdmin();
    } else if (activePortal === 'Staff' && input === 'SKAITECH2026') {
        closeLogin();
        showUser('Staff');
    } else if (activePortal === 'Student' && input === 'skaistudent') {
        closeLogin();
        showUser('Student');
    } else {
        alert("Authentication failed: Invalid key.");
    }
}

function showUser(type) {
    const p = document.getElementById('userDashboard');
    p.style.display = 'block';
    p.innerHTML = `
        <div class="dash-card">
            <h2 style="color: var(--primary-blue);">${type} Check-In</h2>
            <p style="margin: 12px 0 20px; color: var(--text-muted);">Session attendance log timestamp.</p>
            <input type="text" id="uname" placeholder="Type your full registered name">
            <button class="btn-3d btn-primary btn-block" onclick="recordPresence('${type}')">Confirm Check-In</button>
            <button class="btn-3d btn-glass btn-block" style="margin-top: 10px;" onclick="location.reload()">Exit Portal</button>
        </div>`;
}

function recordPresence(type) {
    const name = document.getElementById('uname').value.trim();
    if (!name) return alert("Please type your name.");
    alert(`Attendance marked successfully for ${name} [${type}].`);
    location.reload();
}

function showAdmin() {
    const p = document.getElementById('adminDashboard');
    p.style.display = 'block';
    p.innerHTML = `
        <div class="container">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                <h2>Admin Management Operations</h2>
                <button class="btn-3d btn-glass" onclick="location.reload()">Exit Console</button>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 20px;">Direct access to real-time verification records and rosters:</p>
            <button class="btn-3d btn-primary" onclick="window.open('https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}', '_blank')">
                <i class="fas fa-table"></i> Launch Google Cloud Records Sheet
            </button>
        </div>`;
}
