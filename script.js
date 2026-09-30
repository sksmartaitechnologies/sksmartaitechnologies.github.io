// Google Cloud Sheet ID for Real-Time Credential Querying
const GOOGLE_SHEET_ID = "1s90ibbiPYos-cEapdJlO4g8J67AmhVqehllCXZKhw_w";

// Institutional Matrix Catalog (Internships, Workshops, and Professional Courses)
const academicModules = [
    { title: "Applied Artificial Intelligence", type: "course", duration: "12 Weeks", tag: "AI & Neural Nets", desc: "Build convolutional architectures, transformer NLP networks, and deploy containerized models to cloud endpoints." },
    { title: "Deep Learning Model Engineering", type: "internship", duration: "8 Weeks", tag: "Production AI", desc: "Train generative adversarials and multi-layer perception algorithms. Work with real-world computer vision pipelines." },
    { title: "Zero-Day Cyber Defense Masterclass", type: "workshop", duration: "3 Days", tag: "Security", desc: "Live attack emulation, penetration testing workflows, packet inspection, and digital forensics mitigation." },
    { title: "Machine Learning Foundations", type: "course", duration: "10 Weeks", tag: "Predictive Analytics", desc: "Supervised and unsupervised regression algorithms, cluster optimizations, and predictive statistical frameworks." },
    { title: "Full-Stack Enterprise Development", type: "internship", duration: "12 Weeks", tag: "Web Architecture", desc: "Architect responsive user interfaces connected to scalable microservice backends with automated deployment pipelines." },
    { title: "Industrial Embedded IoT Systems", type: "workshop", duration: "4 Days", tag: "Hardware & Telemetry", desc: "Microcontroller flashing, edge sensor nodes, and streaming telemetry over low-latency MQTT networks." },
    { title: "FinTech & Quantitative Risk Modeling", type: "internship", duration: "6 Weeks", tag: "Finance & Analytics", desc: "Predict loan default parameters, assess portfolio credit exposure, and deploy automated OCR ledger verification." },
    { title: "Power BI & Corporate Intelligence", type: "course", duration: "6 Weeks", tag: "Business Analytics", desc: "Formulate executive decision matrix dashboards, manage data warehouses, and map complex KPIs." },
    { title: "Decentralized Blockchain Architectures", type: "course", duration: "8 Weeks", tag: "Web3 & Ledger", desc: "Smart contract logic, decentralized application development, consensus verification, and immutability security." },
    { title: "Data Science & Feature Engineering", type: "internship", duration: "8 Weeks", tag: "Data Engineering", desc: "ETL pipelines, data cleaning protocols, multi-dimensional array preprocessing, and data storytelling." },
    { title: "Python Automation & System Design", type: "course", duration: "8 Weeks", tag: "Core Programming", desc: "Object-oriented design patterns, concurrency frameworks, modular package distribution, and system scripting." },
    { title: "Enterprise Cloud Virtualization", type: "workshop", duration: "3 Days", tag: "Cloud & DevOps", desc: "Multi-zone serverless clusters, VPC configurations, identity access management, and automated scaling." },
    { title: "Modern Web Engineering", type: "course", duration: "6 Weeks", tag: "Frontend Systems", desc: "Dynamic asynchronous data hydration, high-performance styling rules, and native API consumption." },
    { title: "Banking Analytics & Anomaly Detection", type: "workshop", duration: "2 Days", tag: "FinTech", desc: "Deploy classification engines to locate anomalous transaction patterns in simulated high-frequency banking feeds." },
    { title: "Core Java & Multi-Threaded Services", type: "course", duration: "10 Weeks", tag: "Enterprise Backend", desc: "Thread pools, memory management, structural relational database layers, and cross-platform architecture." },
    { title: "IoT Firmware & Embedded C", type: "internship", duration: "8 Weeks", tag: "Hardware", desc: "Real-time operating systems (RTOS), hardware interrupts, protocol decoders, and sensor calibration." },
    { title: "Digital Marketing Analytics & Funnels", type: "workshop", duration: "2 Days", tag: "Growth Analytics", desc: "Algorithmic conversion funnel tracking, attribution modeling, and automated consumer re-engagement strategies." },
    { title: "Financial Analyst Valuation Track", type: "course", duration: "8 Weeks", tag: "Investment Research", desc: "Discounted cash flows (DCF), macroeconomic indicator synthesis, and equity research analytics." },
    { title: "Data Engineering Pipeline Ingestion", type: "internship", duration: "10 Weeks", tag: "Big Data", desc: "Construct multi-gigabyte ingestion pipes, relational schematics, and optimize low-latency server configurations." },
    { title: "High-Frequency Financial Data Engines", type: "workshop", duration: "3 Days", tag: "Algorithmic Trading", desc: "Architect streaming time-series analysis for tick-level currency and equity transactions using Python libraries." },
    { title: "Applied Ethical Hacking & Audits", type: "internship", duration: "6 Weeks", tag: "Cyber Security", desc: "Perform compliance audits, patch vulnerability vectors, and harden infrastructure against brute-force intrusion." }
];

let activeTrack = 'all';

// Initialize Three.js 3D Background Engine, Perspective Listeners & Modules
document.addEventListener("DOMContentLoaded", () => {
    init3DBackground();
    init3DTilt();
    renderModules(academicModules);
    initCounters();

    // Check for direct URL certificate verification
    const params = new URLSearchParams(window.location.search);
    const certId = params.get('id');
    if (certId) {
        const verifySection = document.getElementById('verify');
        if (verifySection) verifySection.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('certInput').value = certId;
        setTimeout(() => { verifyCertificate(); }, 350);
    }
});

// 1. Three.js Spatial Background Layer (Eliminates dead empty space)
function init3DBackground() {
    const container = document.getElementById('canvas3d-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dynamic 3D Particle Cloud
    const particleCount = 850;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xf5c518);
    const cyanColor = new THREE.Color(0x00f2fe);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 60;
        positions[i + 1] = (Math.random() - 0.5) * 60;
        positions[i + 2] = (Math.random() - 0.5) * 50;

        const mixed = Math.random() > 0.4 ? goldColor : cyanColor;
        colors[i] = mixed.r;
        colors[i + 1] = mixed.g;
        colors[i + 2] = mixed.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.18,
        vertexColors: true,
        transparent: true,
        opacity: 0.75
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle 3D Geometric Torus Grid in depth
    const torusGeo = new THREE.TorusGeometry(14, 0.05, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0xf5c518, wireframe: true, transparent: true, opacity: 0.15 });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torus);

    // Mouse movement parallax
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0008;
        particles.rotation.x += 0.0004;

        torus.rotation.x += 0.001;
        torus.rotation.y += 0.001;

        camera.position.x += (mouseX * 15 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 15 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();
}

// 2. Interactive 3D Perspective Tilt on Elements
function init3DTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

// 3. Render Academic & Industrial Matrix
function renderModules(data) {
    const grid = document.getElementById('portalGrid');
    if (!grid) return;

    if (data.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 50px;">No programs found matching criteria.</div>`;
        return;
    }

    grid.innerHTML = data.map(m => `
        <div class="module-card" data-tilt>
            <div>
                <div class="module-meta-top">
                    <span class="badge-tag ${m.type}">${m.type}</span>
                    <span class="module-duration"><i class="fas fa-clock"></i> ${m.duration}</span>
                </div>
                <h3>${m.title}</h3>
                <p>${m.desc}</p>
            </div>
            <div class="module-footer-action">
                <span class="live-indicator">Admissions Active</span>
                <a href="https://wa.me/919361483073?text=I%20want%20to%20register%20for%20${encodeURIComponent(m.title)}" target="_blank" class="module-link">
                    Apply Now <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `).join('');

    init3DTilt(); // Rebind tilt listeners for newly generated cards
}

// 4. Tab & Live Query Filter
function switchTrack(trackType, btn) {
    activeTrack = trackType;
    document.querySelectorAll('.track-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterModules();
}

function filterModules() {
    const query = document.getElementById('moduleSearch').value.toLowerCase().trim();
    const filtered = academicModules.filter(m => {
        const matchesTrack = (activeTrack === 'all') || (m.type === activeTrack);
        const matchesQuery = m.title.toLowerCase().includes(query) || m.desc.toLowerCase().includes(query) || m.tag.toLowerCase().includes(query);
        return matchesTrack && matchesQuery;
    });
    renderModules(filtered);
}

// 5. Holographic Certificate Verification
function verifyCertificate() {
    const idInput = document.getElementById('certInput');
    const id = idInput.value.trim();
    const feedback = document.getElementById('verifyFeedback');

    if (!id) {
        feedback.innerHTML = `<div style="color: #ef4444; margin-top: 15px; font-weight: 700;"><i class="fas fa-triangle-exclamation"></i> Input a valid Certificate/Registration ID.</div>`;
        return;
    }

    feedback.innerHTML = `<div style="color: var(--gold); margin-top: 18px; font-weight: 600;"><i class="fas fa-spinner fa-spin"></i> Authenticating with Cloud Ledger Database...</div>`;

    const targetUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json`;

    fetch(targetUrl)
        .then(res => res.text())
        .then(data => {
            const rawJson = JSON.parse(data.substr(47).slice(0, -2));
            const rows = rawJson.table.rows;
            let record = null;

            for (let i = 0; i < rows.length; i++) {
                const c = rows[i].c;
                if (c && c[0] && c[0].v && c[0].v.toString().trim().toLowerCase() === id.toLowerCase()) {
                    record = {
                        id: c[0].v,
                        name: c[1] ? c[1].v : "N/A",
                        course: c[2] ? c[2].v : "N/A",
                        date: c[3] ? c[3].v : "N/A"
                    };
                    break;
                }
            }

            if (record) {
                feedback.innerHTML = `
                    <div class="holo-badge-card">
                        <div class="holo-head">
                            <div>
                                <span class="holo-id">${record.id}</span>
                                <h4 style="color: #4ade80; margin-top: 4px;"><i class="fas fa-certificate"></i> Verified Credential</h4>
                            </div>
                            <i class="fas fa-award" style="font-size: 2.4rem; color: var(--gold);"></i>
                        </div>
                        <div class="holo-field">
                            <label>Awarded Candidate</label>
                            <div>${record.name}</div>
                        </div>
                        <div class="holo-field">
                            <label>Completed Track / Specialization</label>
                            <div>${record.course}</div>
                        </div>
                        <div class="holo-field">
                            <label>Issuance & Completion Date</label>
                            <div>${record.date}</div>
                        </div>
                    </div>`;
            } else {
                feedback.innerHTML = `
                    <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); padding: 16px; border-radius: 12px; color: #f87171; margin-top: 20px;">
                        <i class="fas fa-circle-xmark"></i> Verification Error: No active records matching <strong>"${id}"</strong> found on the registry.
                    </div>`;
            }
        })
        .catch(err => {
            console.error("Cloud Connection Exception:", err);
            feedback.innerHTML = `<div style="color: #ef4444; margin-top: 15px; font-weight: 700;"><i class="fas fa-triangle-exclamation"></i> Network Error: Check spreadsheet link sharing permissions.</div>`;
        });
}

// 6. Viewport Animated Counters
function initCounters() {
    const statsSec = document.getElementById('stats');
    if (!statsSec) return;

    let triggered = false;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !triggered) {
            triggered = true;
            document.querySelectorAll('.stat-counter').forEach(c => {
                const target = parseInt(c.getAttribute('data-count'), 10);
                let current = 0;
                const increment = Math.ceil(target / 40);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        c.innerText = target;
                        clearInterval(timer);
                    } else {
                        c.innerText = current;
                    }
                }, 30);
            });
        }
    }, { threshold: 0.3 });

    observer.observe(statsSec);
}

// 7. Security Gateway Authentication Logic
let currentPortalRole = "";

function openAuthModal(role) {
    currentPortalRole = role;
    document.getElementById('authTitle').innerText = `${role} Gateway`;
    document.getElementById('authModal').style.display = 'flex';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
    document.getElementById('authKey').value = '';
}

function togglePassEye() {
    const input = document.getElementById('authKey');
    const icon = document.querySelector('.toggle-key');
    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
        input.type = "password";
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    }
}

function authenticateUser() {
    const key = document.getElementById('authKey').value;
    if (currentPortalRole === 'Admin' && key === "santhassk") {
        closeAuthModal();
        showAdminControl();
    } else if (currentPortalRole === 'Staff' && key === "SKAITECH2026") {
        closeAuthModal();
        showAttendanceInterface('Staff');
    } else if (currentPortalRole === 'Student' && key === "skaistudent") {
        closeAuthModal();
        showAttendanceInterface('Student');
    } else {
        alert("Authentication failed: Access passkey invalid.");
    }
}

function showAttendanceInterface(role) {
    const panel = document.getElementById('attendancePanel');
    panel.style.display = 'block';
    panel.innerHTML = `
        <div class="modal-card" style="margin: 100px auto;" data-tilt>
            <h2 class="accent-gold">${role} Check-In</h2>
            <p style="margin: 10px 0 20px; color: var(--text-muted);">Timestamped Daily Log Terminal</p>
            <input type="text" id="attName" placeholder="Enter Full Legal Name" style="width:100%; padding:14px; background:rgba(0,0,0,0.5); border:1px solid var(--glass-border); border-radius:10px; color:white; outline:none; margin-bottom:15px;">
            <button class="btn-3d btn-primary-3d" style="width:100%" onclick="recordLog('${role}')">Record Attendance</button>
            <button class="btn-3d btn-glass-3d" style="width:100%; margin-top:10px;" onclick="location.reload()">Exit Gateway</button>
        </div>`;
    init3DTilt();
}

function recordLog(role) {
    const name = document.getElementById('attName').value.trim();
    if (!name) return alert("Please specify full name.");
    alert(`Success: Attendance registered for ${name} [${role}] on the local session.`);
    location.reload();
}

function showAdminControl() {
    const panel = document.getElementById('adminPanel');
    panel.style.display = 'block';
    panel.innerHTML = `
        <div class="section-container" style="padding-top: 100px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 30px;">
                <h2 class="accent-gold">Administrative Systems Console</h2>
                <button class="btn-3d btn-glass-3d" onclick="location.reload()">Exit Console</button>
            </div>
            <p style="color:var(--text-muted); margin-bottom:20px;">Use the cloud connector below to modify the verification records directly on the Google Sheet database.</p>
            <button class="btn-3d btn-primary-3d" onclick="window.open('https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}', '_blank')">
                <span><i class="fas fa-database"></i> Launch Google Cloud Database</span>
            </button>
        </div>`;
}

function toggleMenu() {
    const links = document.querySelector('.nav-links');
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
}
