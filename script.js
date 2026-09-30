// Google Cloud Sheet ID for Public Credential Verification
const GOOGLE_SHEET_ID = "1s90ibbiPYos-cEapdJlO4g8J67AmhVqehllCXZKhw_w";

// Structured Offering Catalog (Internships, Workshops, Full Courses)
const offeringsCatalog = [
  // Industrial Internships
  { title: "Artificial Intelligence & DL Internship", type: "internship", duration: "8-12 Weeks", desc: "Build neural network classifiers, transformer models, and real-time computer vision inference services." },
  { title: "Full Stack Web Engineering Internship", type: "internship", duration: "8 Weeks", desc: "Architect responsive user interfaces, modular REST services, and database management layers." },
  { title: "Data Science & BI Strategy Internship", type: "internship", duration: "6 Weeks", desc: "Execute multi-variable feature selection, clean tabular data, and deploy Power BI dashboards." },
  { title: "Cyber Defense & PenTesting Internship", type: "internship", duration: "8 Weeks", desc: "Audit networks, inspect packet streams, and implement defensive zero-day counter-measures." },
  { title: "FinTech Analytics & Risk Internship", type: "internship", duration: "8 Weeks", desc: "Engineer quantitative models for loan classification, default prediction, and market tick feeds." },
  { title: "Embedded Systems & IoT Internship", type: "internship", duration: "6 Weeks", desc: "Program microcontrollers, manage sensor inputs, and stream telemetry over MQTT networks." },

  // Specialized Workshops
  { title: "Generative AI & LLM Fine-Tuning", type: "workshop", duration: "2-Day Sprint", desc: "Hands-on transformer prompt engineering, vector database retrieval, and model quantization." },
  { title: "Power BI & Tableau Corporate Matrix", type: "workshop", duration: "3-Day Sprint", desc: "Build executive visual dashboards with calculated measures and real-time database connectors." },
  { title: "Ethical Hacking & Network Forensics", type: "workshop", duration: "2-Day Sprint", desc: "Practical intrusion detection, port vulnerability auditing, and forensic analysis." },
  { title: "High-Frequency FinTech Pipelines", type: "workshop", duration: "2-Day Sprint", desc: "Stream financial ticks into Python time-series arrays and generate statistical indicators." },

  // Full Certification Courses
  { title: "Machine Learning Masterclass", type: "course", duration: "16 Weeks", desc: "Comprehensive exploration of supervised, unsupervised, and reinforcement algorithms." },
  { title: "Cloud Computing & AWS Architecture", type: "course", duration: "10 Weeks", desc: "Manage serverless microservices, IAM access roles, and scalable cluster topologies." },
  { title: "Python Programming from Scratch", type: "course", duration: "8 Weeks", desc: "Object-oriented software development, asynchronous routines, and automation scripts." },
  { title: "Enterprise Java Application Systems", type: "course", duration: "10 Weeks", desc: "Build multi-threaded enterprise software backed by relational databases and Spring Boot." },
  { title: "Modern Blockchain Engineering", type: "course", duration: "12 Weeks", desc: "Develop decentralized applications, smart contract protocols, and immutable ledgers." }
];

let activeFilter = 'all';

// On Document Load
document.addEventListener("DOMContentLoaded", () => {
  initBackgroundCanvas();
  initHeroCard3D();
  renderOfferings(offeringsCatalog);

  // URL Parameter auto-lookup for certificates (e.g. ?id=SK-AI-101)
  const urlParams = new URLSearchParams(window.location.search);
  const certParam = urlParams.get('id');
  if (certParam) {
    const verifySec = document.getElementById('verify');
    if (verifySec) verifySec.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('certInput').value = certParam;
    setTimeout(verifyCertificate, 300);
  }

  // Mobile menu toggle
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }
});

// Render Offerings
function renderOfferings(items) {
  const grid = document.getElementById('offeringsGrid');
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No programs found matching the query.</div>`;
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="offering-card">
      <div>
        <div class="offering-badge badge-${item.type}">${item.type}</div>
        <h3 class="offering-title">${item.title}</h3>
        <p class="offering-desc">${item.desc}</p>
      </div>
      <div class="offering-footer">
        <span><i class="fa-regular fa-clock"></i> ${item.duration}</span>
        <span>Enroll Now <i class="fa-solid fa-arrow-right"></i></span>
      </div>
    </div>
  `).join('');
}

// Search and Filter Handling
function applyFilter(type, buttonEl) {
  activeFilter = type;
  document.querySelectorAll('.filter-pills .pill').forEach(btn => btn.classList.remove('active'));
  buttonEl.classList.add('active');
  executeFilter();
}

function handleSearch() {
  executeFilter();
}

function executeFilter() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const results = offeringsCatalog.filter(item => {
    const matchesCategory = (activeFilter === 'all') || (item.type === activeFilter);
    const matchesSearch = item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
  renderOfferings(results);
}

// 3D Tilt Centerpiece
function initHeroCard3D() {
  const card = document.getElementById('heroCard3d');
  if (!card) return;

  window.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 28;
    const y = (window.innerHeight / 2 - e.clientY) / 28;
    card.style.transform = `rotateY(${-x}deg) rotateX(${y}deg)`;
  });
}

// Background Clean 3D Geometric Canvas
function initBackgroundCanvas() {
  const canvas = document.getElementById('canvas3d');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodes = [];
  const nodeCount = 35;

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2.5 + 1.5
    });
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      ctx.fillStyle = 'rgba(29, 78, 216, 0.35)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
        if (dist < 140) {
          ctx.strokeStyle = `rgba(29, 78, 216, ${0.12 * (1 - dist / 140)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
}

// Certificate Verification Fetcher
function verifyCertificate() {
  const idInput = document.getElementById('certInput');
  const feedback = document.getElementById('verifyFeedback');
  const id = idInput.value.trim();

  if (!id) {
    feedback.innerHTML = `<p style="color: #dc2626; margin-top: 14px; font-weight: 600;">Please enter a certificate ID.</p>`;
    return;
  }

  feedback.innerHTML = `<p style="color: var(--primary); margin-top: 14px; font-weight: 600;"><i class="fa-solid fa-spinner fa-spin"></i> Querying cloud database...</p>`;

  const endpoint = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json`;

  fetch(endpoint)
    .then(res => res.text())
    .then(text => {
      const json = JSON.parse(text.substr(47).slice(0, -2));
      const rows = json.table.rows;
      let record = null;

      for (let i = 0; i < rows.length; i++) {
        const c = rows[i].c;
        if (c && c[0] && c[0].v && c[0].v.toString().trim().toLowerCase() === id.toLowerCase()) {
          record = {
            id: c[0].v,
            name: c[1] ? c[1].v : "Candidate Record",
            course: c[2] ? c[2].v : "Program Name",
            date: c[3] ? c[3].v : "Verified Date"
          };
          break;
        }
      }

      if (record) {
        feedback.innerHTML = `
          <div class="cert-card-3d">
            <div class="cert-header">
              <div>
                <span class="cert-id-tag">${record.id}</span>
                <h4 style="margin-top: 6px; color: #16a34a;"><i class="fa-solid fa-circle-check"></i> Authenticated Credential</h4>
              </div>
              <i class="fa-solid fa-award" style="font-size: 2.2rem; color: var(--gold);"></i>
            </div>
            <div class="cert-row">
              <label>Candidate Name</label>
              <div>${record.name}</div>
            </div>
            <div class="cert-row">
              <label>Program / Track</label>
              <div>${record.course}</div>
            </div>
            <div class="cert-row">
              <label>Completion Date</label>
              <div>${record.date}</div>
            </div>
          </div>
        `;
      } else {
        feedback.innerHTML = `
          <div style="background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; padding: 14px; border-radius: 10px; margin-top: 16px;">
            <i class="fa-solid fa-circle-xmark"></i> No valid record found for ID "<strong>${id}</strong>".
          </div>
        `;
      }
    })
    .catch(err => {
      console.error(err);
      feedback.innerHTML = `<p style="color: #dc2626; margin-top: 14px; font-weight: 600;">Unable to connect to verification database.</p>`;
    });
}

// Authentication & Portal Access
let activeRole = "";

function openLoginModal(role) {
  activeRole = role;
  document.getElementById('modalRole').innerText = `${role} Portal`;
  document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
  document.getElementById('passkeyInput').value = '';
}

function togglePassVisibility() {
  const input = document.getElementById('passkeyInput');
  input.type = input.type === 'password' ? 'text' : 'password';
}

function authenticatePortal() {
  const key = document.getElementById('passkeyInput').value;
  
  if (activeRole === 'Admin' && key === 'santhassk') {
    closeLoginModal();
    showAdminDashboard();
  } else if (activeRole === 'Staff' && key === 'SKAITECH2026') {
    closeLoginModal();
    showUserDashboard('Staff');
  } else if (activeRole === 'Student' && key === 'skaistudent') {
    closeLoginModal();
    showUserDashboard('Student');
  } else {
    alert("Authentication failed: Invalid key.");
  }
}

function showUserDashboard(role) {
  const panel = document.getElementById('userDashboard');
  panel.style.display = 'block';
  panel.innerHTML = `
    <div class="dash-box">
      <h2 style="color: var(--primary); margin-bottom: 8px;">${role} Attendance</h2>
      <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 20px;">Session check-in timestamp.</p>
      <input type="text" id="traineeName" placeholder="Enter Full Name">
      <button class="btn-3d btn-primary btn-full" onclick="recordAttendance('${role}')">Mark Present</button>
      <button class="btn-3d btn-outline btn-full" style="margin-top: 10px;" onclick="location.reload()">Exit Portal</button>
    </div>
  `;
}

function recordAttendance(role) {
  const name = document.getElementById('traineeName').value.trim();
  if (!name) return alert("Please enter your name.");
  alert(`Attendance marked for ${name} [${role}].`);
  location.reload();
}

function showAdminDashboard() {
  const panel = document.getElementById('adminDashboard');
  panel.style.display = 'block';
  panel.innerHTML = `
    <div class="container" style="max-width: 600px; margin-top: 60px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
        <h2>Admin Management</h2>
        <button class="btn-3d btn-outline" onclick="location.reload()">Exit</button>
      </div>
      <p style="color: var(--text-muted); margin-bottom: 20px;">Manage student data and cloud certificate records:</p>
      <button class="btn-3d btn-primary btn-full" onclick="window.open('https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}', '_blank')">
        <i class="fa-solid fa-table"></i> Open Google Cloud Sheet
      </button>
    </div>
  `;
}
