// Google Cloud Database Sheet Reference Configuration
const GOOGLE_SHEET_ID = "1s90ibbiPYos-cEapdJlO4g8J67AmhVqehllCXZKhw_w";

// Comprehensive 21 Specialization Tracks
const courseData = [
    { title: "Artificial Intelligence", category: "ai", desc: "Master advanced Neural Networks, NLP transformers, and Computer Vision algorithms.\nDeploy production-ready models on cloud inference clusters." },
    { title: "Machine Learning", category: "ai", desc: "Build enterprise predictive pipelines using robust supervised & unsupervised methods.\nOptimize high-dimensional hyperparameter architectures." },
    { title: "Deep Learning (DL)", category: "ai", desc: "Construct state-of-the-art computational neural graphs and generative models.\nTrain multi-modal layers on distributed GPU nodes." },
    { title: "Data Science", category: "data", desc: "Architect end-to-end feature pipelines and automated cleaning flows.\nFormulate Business Intelligence strategies with modern visualization tools." },
    { title: "Cyber Security", category: "dev", desc: "Implement defensive operations using modern ethical hacking and digital forensics.\nMitigate zero-day intrusion vectors across distributed networks." },
    { title: "Blockchain Tech", category: "dev", desc: "Develop secure distributed ledger smart contracts and immutable protocols.\nArchitect high-throughput decentralized applications." },
    { title: "Python Programming", category: "dev", desc: "Master object-oriented architecture, asynchronous concurrency, and system tools.\nBuild microservice endpoints using performant computational frameworks." },
    { title: "Power BI & Tableau", category: "data", desc: "Design interactive corporate dashboards with real-time database gateways.\nTranslate complex tabular analytics into executive decision matrices." },
    { title: "Java Programming", category: "dev", desc: "Engineer enterprise software using clean multi-threading and clean architecture.\nDevelop robust backend systems backed by relational schemas." },
    { title: "Cloud Computing", category: "dev", desc: "Architect serverless computing infrastructures and multi-zone networks.\nManage enterprise virtualization, security policies, and containerization." },
    { title: "Internet of Things", category: "dev", desc: "Design smart connected mesh architectures and sensory grids.\nDeploy telemetry nodes backed by robust edge processing engines." },
    { title: "Embedded IoT", category: "dev", desc: "Program microcontrollers with low-latency operational firmware protocols.\nOptimize hardware telemetry streams with low-power communication channels." },
    { title: "Financial Analyst", category: "fintech", desc: "Master corporate valuation models and macroeconomic indicators.\nPerform equity research alongside quantitative portfolio tracking algorithms." },
    { title: "Digital Marketing", category: "fintech", desc: "Build ROI-focused multi-channel consumer engagement campaigns.\nLeverage web analytics architectures and automated funnel optimizations." },
    { title: "Financial Data Engineering", category: "fintech", desc: "Architect time-series pipelines for high-frequency tick market data.\nOptimize high-throughput relational data stores using specialized Python tools." },
    { title: "Banking Analytics & Risk", category: "fintech", desc: "Deploy classification models to predict loan default metrics.\nBuild real-time anomaly detection pipelines to mitigate operational exposure." },
    { title: "Next-Gen FinTech", category: "fintech", desc: "Develop secure distributed ledger layers for investment clearing networks.\nImplement automated smart contracts and intelligent OCR banking engines." },
    { title: "Data Analytics", category: "data", desc: "Translate historical metrics into clear corporate strategy trends.\nBuild structured database layers alongside enterprise-level visual analytics." },
    { title: "Data Engineer", category: "data", desc: "Construct multi-gigabyte ingestion networks and data transformations.\nMaintain low-latency server configurations for enterprise engineering models." },
    { title: "Full Stack Development", category: "dev", desc: "Engineer comprehensive client-side interfaces and responsive user pathways.\nDeploy scalable backend logical layers backed by cloud deployment strategies." },
    { title: "Web Development", category: "dev", desc: "Design elegant modern applications with responsive grid configurations.\nImplement performant data fetching mechanisms using vanilla engine frameworks." }
];

let currentFilter = 'all';

// Initialize Everything on Load
document.addEventListener("DOMContentLoaded", () => {
    initThreeBackground();
    init3DTiltCards();
    renderCourses(courseData);
    initStatsCounter();

    // Check URL parameters for direct certificate verification
    const urlParams = new URLSearchParams(window.location.search);
    const certIdFromUrl = urlParams.get('id');
    if (certIdFromUrl) {
        const verifySection = document.getElementById('verify');
        if (verifySection) verifySection.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('certId').value = certIdFromUrl;
        setTimeout(() => { manualVerify(); }, 400);
    }
});

/* ==========================================================
   1. Interactive Three.js 3D Background Engine
   ========================================================== */
function initThreeBackground() {
    const canvas = document.getElementById('bg3dCanvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create 3D Floating Particle Matrix (Wave Field)
    const particleCount = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    let idx = 0;
    for (let x = -30; x < 30; x++) {
        for (let z = -15; z < 15; z++) {
            positions[idx * 3] = x * 3.8;
            positions[idx * 3 + 1] = -12;
            positions[idx * 3 + 2] = z * 3.8;
            scales[idx] = 1.2;
            idx++;
            if (idx >= particleCount) break;
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Shader Material
    const material = new THREE.PointsMaterial({
        color: 0xd4af37,
        size: 1.2,
        transparent: true,
        opacity: 0.65
    });

    const particlesWave = new THREE.Points(geometry, material);
    scene.add(particlesWave);

    // Floating Geometric 3D Polyhedrons
    const polyGeo = new THREE.IcosahedronGeometry(12, 1);
    const polyMat = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.12
    });
    const icosahedron = new THREE.Mesh(polyGeo, polyMat);
    icosahedron.position.set(35, 10, -20);
    scene.add(icosahedron);

    const polyGeo2 = new THREE.TorusGeometry(14, 2, 8, 30);
    const polyMat2 = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const torus = new THREE.Mesh(polyGeo2, polyMat2);
    torus.position.set(-35, -5, -15);
    scene.add(torus);

    // Mouse Tracking for Interactive Dynamic Response
    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    });

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Render Animation Loop
    let count = 0;
    function animate() {
        requestAnimationFrame(animate);
        count += 0.035;

        // Wave Animation
        const pos = geometry.attributes.position.array;
        let i = 0;
        for (let ix = 0; ix < particleCount; ix++) {
            pos[i + 1] = Math.sin((ix + count) * 0.3) * 3 - 10;
            i += 3;
        }
        geometry.attributes.position.needsUpdate = true;

        // Polyhedron Rotations
        icosahedron.rotation.x += 0.003;
        icosahedron.rotation.y += 0.005;
        torus.rotation.x -= 0.004;
        torus.rotation.y += 0.003;

        // Camera Soft Inertia to Mouse
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();
}

/* ==========================================================
   2. 3D Perspective Card Tilt Micro-interactions
   ========================================================== */
function init3DTiltCards() {
    const cards = document.querySelectorAll('.card-3d');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const inner = card.querySelector('.card-inner');
            if (!inner) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            const inner = card.querySelector('.card-inner');
            if (inner) {
                inner.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            }
        });
    });
}

/* ==========================================================
   3. Course Render & Filtering
   ========================================================== */
function renderCourses(list) {
    const mainGrid = document.getElementById('mainGrid');
    if (!mainGrid) return;

    if (list.length === 0) {
        mainGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No programs found matching search query.</div>`;
        return;
    }

    mainGrid.innerHTML = list.map(c => `
        <div class="card card-3d course-card">
            <div class="card-inner">
                <span class="course-tag">${c.category.toUpperCase()} SPECIALIZATION</span>
                <h3>${c.title}</h3>
                <p>${c.desc.replace(/\n/g, '<br>')}</p>
                <div class="course-bottom">
                    <span><i class="fas fa-microchip"></i> Hands-on Labs</span>
                    <span>Smart-Seal Validated <i class="fas fa-chevron-right"></i></span>
                </div>
            </div>
        </div>
    `).join('');

    init3DTiltCards();
}

function setCategory(cat, btn) {
    currentFilter = cat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterCourses();
}

function filterCourses() {
    const query = document.getElementById('courseSearch').value.toLowerCase().trim();
    const filtered = courseData.filter(c => {
        const matchesCategory = (currentFilter === 'all') || (c.category === currentFilter);
        const matchesQuery = c.title.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query);
        return matchesCategory && matchesQuery;
    });
    renderCourses(filtered);
}

/* ==========================================================
   4. Animated Stat Counters
   ========================================================== */
function initStatsCounter() {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;

    let executed = false;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !executed) {
            executed = true;
            document.querySelectorAll('.counter').forEach(c => {
                const target = parseInt(c.getAttribute('data-target'), 10);
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

    observer.observe(statsSection);
}

/* ==========================================================
   5. Holographic Smart-Seal Verification Engine
   ========================================================== */
function manualVerify() {
    const idInput = document.getElementById('certId');
    const id = idInput.value.trim();
    const resultDiv = document.getElementById('verifyResult');

    if (!id) {
        resultDiv.innerHTML = `<p style="color: #ef4444; margin-top: 15px; font-weight: 700;"><i class="fas fa-triangle-exclamation"></i> Please input a valid Certificate ID.</p>`;
        return;
    }

    resultDiv.innerHTML = `<p style="color: var(--gold-bright); margin-top: 20px; font-weight: 700;"><i class="fas fa-spinner fa-spin"></i> Contacting Cloud Central Ledger...</p>`;
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
                    <div class="hologram-credential-card card-3d">
                        <div class="holo-top">
                            <div>
                                <span class="holo-id">${record.id}</span>
                                <h3 style="color: #2ee06b; margin-top: 6px;"><i class="fas fa-badge-check"></i> VERIFIED ACCREDITATION</h3>
                            </div>
                            <i class="fas fa-certificate" style="font-size: 2.5rem; color: var(--gold-bright);"></i>
                        </div>
                        <div class="holo-field">
                            <label>Certified Student Name</label>
                            <div>${record.name}</div>
                        </div>
                        <div class="holo-field">
                            <label>Domain Specialization Completed</label>
                            <div>${record.course}</div>
                        </div>
                        <div class="holo-field">
                            <label>Completion Date & Status</label>
                            <div>${record.date} — Verified Active</div>
                        </div>
                    </div>`;
            } else {
                resultDiv.innerHTML = `
                    <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); padding: 15px; border-radius: 10px; color: #f87171; margin-top: 20px;">
                        <i class="fas fa-circle-xmark"></i> Verification Failed: No credentials found for "<strong>${id}</strong>".
                    </div>`;
            }
        })
        .catch(err => {
            console.error(err);
            resultDiv.innerHTML = `<p style="color: #ef4444; margin-top: 15px; font-weight: 700;">❌ Database connection offline. Verify cloud link permissions.</p>`;
        });
}

/* ==========================================================
   6. Modal & Portal Access Logic
   ========================================================== */
let activePortal = "";

function togglePasswordVisibility(id, icon) {
    const el = document.getElementById(id);
    if (el.type === "password") {
        el.type = "text";
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
        el.type = "password";
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    }
}

function openLogin(type) {
    activePortal = type;
    document.getElementById('modalTitle').innerText = `${type} Portal Authentication`;
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('portalPass').value = '';
}

function checkPass() {
    const pass = document.getElementById('portalPass').value;
    if (activePortal === 'Admin' && pass === "santhassk") {
        closeLogin();
        showAdminPanel();
    } else if (activePortal === 'Staff' && pass === "SKAITECH2026") {
        closeLogin();
        showUserPortal('Staff');
    } else if (activePortal === 'Student' && pass === "skaistudent") {
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
            <h2 class="accent-glow">${type} Portal</h2>
            <p style="margin: 10px 0 20px; color: var(--text-muted);">Timestamped Daily Terminal Check-In</p>
            <input type="text" id="attName" placeholder="Enter Full Registered Name">
            <button class="btn-3d btn-primary-3d" style="width:100%; justify-content:center;" onclick="markAttendance('${type}')">
                <span>Confirm Check-In</span>
            </button>
            <button class="btn-3d btn-secondary-3d" style="width:100%; justify-content:center; margin-top: 10px;" onclick="location.reload()">
                <span>Exit Portal</span>
            </button>
        </div>`;
}

function markAttendance(type) {
    const name = document.getElementById('attName').value.trim();
    if (!name) return alert("Please type your name.");
    alert(`Attendance marked successfully for ${name} [${type}].`);
    location.reload();
}

function showAdminPanel() {
    const panel = document.getElementById('adminDashboard');
    panel.style.display = 'block';
    panel.innerHTML = `
        <div class="container">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 30px;">
                <h2 class="accent-glow">Management Console</h2>
                <button class="btn-3d btn-secondary-3d" onclick="location.reload()"><span>Exit Console</span></button>
            </div>
            <p style="color:var(--text-muted); margin-bottom: 20px;">Direct gateway to manage master cloud database sheet.</p>
            <button class="btn-3d btn-primary-3d" onclick="window.open('https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}', '_blank')">
                <span><i class="fas fa-table"></i> Open Google Cloud Sheet Database</span>
            </button>
        </div>`;
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#020612';
        navLinks.style.padding = '20px';
    }
}
