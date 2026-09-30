// Google Cloud Sheet Target for Public Credential Queries
const GOOGLE_SHEET_ID = "1s90ibbiPYos-cEapdJlO4g8J67AmhVqehllCXZKhw_w";

// Comprehensive Curriculum Matrix - 21 Tracks
const programCatalog = [
  // 1. Industrial Internships
  { 
    id: 1,
    title: "AI & Neural Networks Internship", 
    type: "internship", 
    duration: "8-12 Weeks", 
    mode: "Cloud GPU Labs", 
    desc: "Build production deep learning pipelines, CNN vision classifiers, and automated LLM fine-tuning pipelines on cloud servers.",
    sprints: [
      { name: "Phase 1: Deep Matrix Mathematics", desc: "Tensors, backprop optimization, autograd graph computations." },
      { name: "Phase 2: Computer Vision & Attention Layers", desc: "Object classification, transfer learning, transformer architectures." },
      { name: "Phase 3: Production Endpoint Deployments", desc: "Dockerized inference clusters and cloud model monitoring." }
    ]
  },
  { 
    id: 2,
    title: "Full Stack Cloud Development Internship", 
    type: "internship", 
    duration: "8 Weeks", 
    mode: "Live Repository", 
    desc: "Engineer responsive interfaces and modular REST API microservices backed by PostgreSQL and container workflows.",
    sprints: [
      { name: "Phase 1: Architecture & Data Modeling", desc: "Database schemas, relational entity indexes, clean route handlers." },
      { name: "Phase 2: Microservice API Orchestration", desc: "JWT security tokens, caching layers, performant background queues." },
      { name: "Phase 3: Multi-Zone Cloud Deployment", desc: "CI/CD automated testing runners and static edge caching." }
    ]
  },
  { 
    id: 3,
    title: "Data Science & BI Strategy Internship", 
    type: "internship", 
    duration: "6 Weeks", 
    mode: "Corporate Desk", 
    desc: "Model multi-gigabyte datasets, curate predictive business models, and translate insights into scalable reporting.",
    sprints: [
      { name: "Phase 1: Feature Extraction & Scrubbing", desc: "Handling outliers, imputation, categorical dimensionality reduction." },
      { name: "Phase 2: Statistical Predictive Modeling", desc: "Regression pipelines, random forests, classification validation." },
      { name: "Phase 3: Corporate Decision Dashboards", desc: "Power BI streaming feeds and executive analytical matrixes." }
    ]
  },
  { 
    id: 4,
    title: "Cyber Defense & PenTesting Internship", 
    type: "internship", 
    duration: "8 Weeks", 
    mode: "Isolated Sandbox", 
    desc: "Conduct active network scans, audit firewall configurations, and automate zero-day intrusion defense scripts.",
    sprints: [
      { name: "Phase 1: Reconnaissance & Port Scanning", desc: "Network footprinting, vulnerability exploitation benchmarks." },
      { name: "Phase 2: Intrusion Defense & Packet Analysis", desc: "Wireshark packet sniffing, defensive honey-pot routing." },
      { name: "Phase 3: Compliance & Security Forensics", desc: "Incident response runbooks and cryptographic credential safeguards." }
    ]
  },
  { 
    id: 5,
    title: "FinTech & Quantitative Risk Internship", 
    type: "internship", 
    duration: "8 Weeks", 
    mode: "Analytics Desk", 
    desc: "Engineer loan default classification models and analyze market transaction logs using quantitative Python packages.",
    sprints: [
      { name: "Phase 1: Time-Series Market Modeling", desc: "Statistical stationary tests, volatility clustering, alpha indicators." },
      { name: "Phase 2: Anomaly & Fraud Detection", desc: "Isolation forests and neural autoencoders on high-frequency transactions." },
      { name: "Phase 3: Backtesting & Risk Metric Engines", desc: "Monte Carlo simulation and Sharpe ratio portfolio metrics." }
    ]
  },
  { 
    id: 6,
    title: "Embedded Systems & IoT Internship", 
    type: "internship", 
    duration: "6 Weeks", 
    mode: "Hardware Kit", 
    desc: "Program microcontrollers, configure sensory grids, and establish real-time telemetry streams over low-latency MQTT networks.",
    sprints: [
      { name: "Phase 1: Microcontroller Firmware", desc: "GPIO interfaces, I2C, SPI communication protocols and interrupts." },
      { name: "Phase 2: Sensory Streaming & Edge Queues", desc: "Lightweight MQTT brokers, local threshold analytics." },
      { name: "Phase 3: Cloud Telemetry Dashboarding", desc: "Real-time edge ingestion into cloud visual interfaces." }
    ]
  },

  // 2. Sprint Workshops
  { 
    id: 7,
    title: "Transformer Networks & GenAI", 
    type: "workshop", 
    duration: "2-Day Sprint", 
    mode: "Hands-on", 
    desc: "Intensive deep-dive into transformer layers, custom vector embeddings, tokenizer optimizations, and inference endpoints.",
    sprints: [
      { name: "Day 1: Attention Graphs & Tokenization", desc: "Multi-head attention mechanisms and custom embedding models." },
      { name: "Day 2: Vector DBs & Retrieval Pipelines", desc: "Building RAG applications and low-latency API serving." }
    ]
  },
  { 
    id: 8,
    title: "Power BI & Tableau Decision Matrix", 
    type: "workshop", 
    duration: "3-Day Sprint", 
    mode: "Corporate Lab", 
    desc: "Rapidly translate raw database extracts into interactive decision panels with dynamic drill-down hierarchies.",
    sprints: [
      { name: "Day 1: DAX Formulas & Star Schemas", desc: "Calculated columns, measures, and relational matrix setups." },
      { name: "Day 2: Dynamic User Parameters", desc: "What-if parameter controls and KPI alert rules." },
      { name: "Day 3: Executive Reporting Panels", desc: "Publishing live dashboards to corporate workspaces." }
    ]
  },
  { 
    id: 9,
    title: "Ethical Hacking & Network Forensics", 
    type: "workshop", 
    duration: "2-Day Sprint", 
    mode: "Virtual Lab", 
    desc: "Practical intrusion detection, port vulnerability auditing, credential attack defenses, and forensic analysis.",
    sprints: [
      { name: "Day 1: Offensive Attack Vectors", desc: "Payload delivery, brute force defense, and sandbox isolation." },
      { name: "Day 2: Forensics & Memory Dumps", desc: "Tracking malicious binaries and validating zero-trust networks." }
    ]
  },
  { 
    id: 10,
    title: "High-Frequency Financial Data Pipelines", 
    type: "workshop", 
    duration: "2-Day Sprint", 
    mode: "Code Bootcamp", 
    desc: "Stream financial ticks into Python time-series arrays and generate statistical indicators in real-time.",
    sprints: [
      { name: "Day 1: WebSocket Feeds & Micro-Bucketing", desc: "Handling millisecond order books and parsing depth feeds." },
      { name: "Day 2: Real-time Signal Processing", desc: "VWAP, momentum indicators, and order-routing triggers." }
    ]
  },

  // 3. Full Certification Programs
  { 
    id: 11,
    title: "Machine Learning Masterclass", 
    type: "course", 
    duration: "16 Weeks", 
    mode: "Instructor-Led", 
    desc: "Comprehensive exploration of supervised, unsupervised, and reinforcement algorithms with mathematical loss function proofs.",
    sprints: [
      { name: "Module 1-4: Mathematical Foundations", desc: "Linear algebra, matrix calculus, gradient descent variations." },
      { name: "Module 5-10: Classical & Ensemble Models", desc: "SVMs, Random Forests, XGBoost, and hyperparameter tuning." },
      { name: "Module 11-16: Model Operations & CI/CD", desc: "Model registry, drift detection, and automated retraining." }
    ]
  },
  { 
    id: 12,
    title: "Blockchain & Ledger Protocols", 
    type: "course", 
    duration: "12 Weeks", 
    mode: "Virtual Lab", 
    desc: "Design immutable smart contracts, consensus mechanisms, and high-throughput decentralized applications.",
    sprints: [
      { name: "Module 1-4: Cryptographic Primitives", desc: "Merkle trees, SHA-256 proofs, public-private key cryptography." },
      { name: "Module 5-8: Smart Contract Engineering", desc: "Solidity logic, reentrancy guards, and unit testing." },
      { name: "Module 9-12: Decentralized Applications", desc: "Frontend Web3 integrations and gas optimization." }
    ]
  },
  { 
    id: 13,
    title: "Enterprise Cloud Computing Architecture", 
    type: "course", 
    duration: "10 Weeks", 
    mode: "Cloud Console", 
    desc: "Architect serverless computing infrastructures and automated multi-zone deployment workflows.",
    sprints: [
      { name: "Module 1-3: Virtual Networks & Subnets", desc: "VPCs, security groups, gateways, and routing tables." },
      { name: "Module 4-7: Serverless Microservices", desc: "Lambda triggers, message queues, and API gateways." },
      { name: "Module 8-10: High Availability & Scaling", desc: "Load balancing, auto-scaling groups, and multi-region failovers." }
    ]
  },
  { 
    id: 14,
    title: "Core & Advanced Python Engineering", 
    type: "course", 
    duration: "8 Weeks", 
    mode: "Hands-on", 
    desc: "Master object-oriented structures, async multi-threading, and performant backend microservice architectures.",
    sprints: [
      { name: "Module 1-2: Core OOP Architecture", desc: "Dunder methods, class decorators, memory management." },
      { name: "Module 3-5: Asynchronous Concurrency", desc: "Asyncio event loops, coroutines, thread pooling." },
      { name: "Module 6-8: REST Engines & Caching", desc: "FastAPI frameworks, Pydantic validation, Redis caching." }
    ]
  },
  { 
    id: 15,
    title: "Modern Java Enterprise Systems", 
    type: "course", 
    duration: "10 Weeks", 
    mode: "Hands-on", 
    desc: "Develop multi-threaded enterprise software layers using modern Spring Boot patterns and database connectors.",
    sprints: [
      { name: "Module 1-3: JVM Internals & Multithreading", desc: "Memory models, thread safety, synchronization primitives." },
      { name: "Module 4-7: Spring Boot Microservices", desc: "Dependency injection, JPA Hibernate, transactional integrity." },
      { name: "Module 8-10: Production Monitoring", desc: "Actuator health metrics, Dockerization, logging aggregation." }
    ]
  },
  { 
    id: 16,
    title: "Deep Learning Computational Graphs", 
    type: "course", 
    duration: "12 Weeks", 
    mode: "GPU Lab", 
    desc: "Study generative adversarial models, diffusion mathematics, and recurrent attention sequences.",
    sprints: [
      { name: "Module 1-4: Advanced Backpropagation", desc: "Custom loss functions, custom PyTorch autograd layers." },
      { name: "Module 5-8: Generative Models", desc: "Variational autoencoders and latent diffusion architectures." },
      { name: "Module 9-12: Quantization & Pruning", desc: "ONNX exports, edge inference acceleration." }
    ]
  },
  { 
    id: 17,
    title: "Digital Marketing Analytics & Funnels", 
    type: "course", 
    duration: "6 Weeks", 
    mode: "Live Campaigns", 
    desc: "Master quantitative multi-channel campaign architectures, tag managers, and conversion optimizations.",
    sprints: [
      { name: "Module 1-2: Multi-Touch Attribution", desc: "Attribution modeling, UTM architectures, tracking setups." },
      { name: "Module 3-4: Funnel Analytics & Drop-off", desc: "Cohort retention analysis and behavioral clustering." },
      { name: "Module 5-6: Automated Growth Engines", desc: "A/B testing statistics and programmatic email automations." }
    ]
  },
  { 
    id: 18,
    title: "Banking Analytics & Risk Engines", 
    type: "course", 
    duration: "8 Weeks", 
    mode: "Corporate Data", 
    desc: "Deploy classification models to identify financial distress, mitigate fraud, and audit regulatory baselines.",
    sprints: [
      { name: "Module 1-3: Credit Scoring Scorecards", desc: "Weight-of-evidence, Information Value calculations." },
      { name: "Module 4-6: Fraud Detection Systems", desc: "Real-time streaming classification rules and anomaly metrics." },
      { name: "Module 7-8: Regulatory Stress-Testing", desc: "Basel regulatory metrics and probability of default forecasts." }
    ]
  },
  { 
    id: 19,
    title: "Next-Gen Financial Technologies", 
    type: "course", 
    duration: "10 Weeks", 
    mode: "FinTech Sandbox", 
    desc: "Build automated clearing ledger systems, financial OCR pipelines, and algorithmic scoring engines.",
    sprints: [
      { name: "Module 1-3: Payment Gateways & APIs", desc: "Webhooks, idempotent transactions, clearing workflows." },
      { name: "Module 4-7: Financial Document OCR", desc: "Tesseract & vision models parsing unstructured financial statements." },
      { name: "Module 8-10: Automated Compliance Checks", desc: "Sanction screening logic and AML rules engines." }
    ]
  },
  { 
    id: 20,
    title: "Big Data Engineering Infrastructure", 
    type: "course", 
    duration: "12 Weeks", 
    mode: "Cluster Labs", 
    desc: "Ingest, transform, and store terabyte-scale distributed data using modern stream processing models.",
    sprints: [
      { name: "Module 1-4: Distributed Ingestion", desc: "Apache Kafka topics, partitions, and consumer groups." },
      { name: "Module 5-8: Stream & Batch Processing", desc: "PySpark transformations and distributed cluster nodes." },
      { name: "Module 9-12: Data Warehousing & Delta Lakes", desc: "Parquet schemas, ACID transactions on object storage." }
    ]
  },
  { 
    id: 21,
    title: "Modern Web Front-End Architecture", 
    type: "course", 
    duration: "8 Weeks", 
    mode: "Interface Lab", 
    desc: "Design high-performance modern user interfaces utilizing responsive grids and performant event loops.",
    sprints: [
      { name: "Module 1-3: Modern CSS Layout Engines", desc: "Subgrid, container queries, and hardware-accelerated animations." },
      { name: "Module 4-6: State Management & Workers", desc: "Web workers, performance budgets, virtual DOM diffing." },
      { name: "Module 7-8: Progressive Web Apps", desc: "Service workers, offline caching strategies, lighthouse 100 audits." }
    ]
  }
];

let currentFilter = 'all';

// Bootstrapping Engine
document.addEventListener("DOMContentLoaded", () => {
  initAmbient3DCanvas();
  initMonolithTilt();
  renderOfferingsMatrix(programCatalog);
  initTiltCards();

  // Auto-scan URL params for direct certificate queries
  const urlParams = new URLSearchParams(window.location.search);
  const certParam = urlParams.get('id');
  if (certParam) {
    const verifyAnchor = document.getElementById('verify');
    if (verifyAnchor) verifyAnchor.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('certQuery').value = certParam;
    setTimeout(verifyCredential, 350);
  }

  // Mobile navigation trigger
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});

// Render Dynamic Grid
function renderOfferingsMatrix(items) {
  const grid = document.getElementById('matrixGrid');
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 50px;">No programs found matching criteria.</div>`;
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="offering-pod tilt-box" onclick="openBlueprint(${item.id})">
      <div>
        <div class="pod-header">
          <span class="pod-badge ${item.type}">${item.type}</span>
          <span class="pod-mode"><i class="fa-solid fa-layer-group"></i> ${item.mode}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
      <div class="pod-footer">
        <span><i class="fa-regular fa-clock"></i> ${item.duration}</span>
        <span>View Blueprint <i class="fa-solid fa-arrow-right"></i></span>
      </div>
    </div>
  `).join('');

  initTiltCards();
}

// Interactive Blueprint Modal
function openBlueprint(id) {
  const item = programCatalog.find(p => p.id === id);
  if (!item) return;

  document.getElementById('bpBadge').innerText = item.type.toUpperCase();
  document.getElementById('bpBadge').className = `pod-badge ${item.type}`;
  document.getElementById('bpTitle').innerText = item.title;
  document.getElementById('bpDesc').innerText = `${item.desc} | Duration: ${item.duration} (${item.mode})`;

  const timelineContainer = document.getElementById('bpTimeline');
  timelineContainer.innerHTML = item.sprints.map(s => `
    <div class="timeline-sprint">
      <h4>${s.name}</h4>
      <p>${s.desc}</p>
    </div>
  `).join('');

  document.getElementById('blueprintModal').style.display = 'flex';
}

function closeBlueprint() {
  document.getElementById('blueprintModal').style.display = 'none';
}

// Search & Filter Dispatchers
function setProgramFilter(type, buttonEl) {
  currentFilter = type;
  document.querySelectorAll('.filter-pills-row .pill-btn').forEach(btn => btn.classList.remove('active'));
  buttonEl.classList.add('active');
  executeCatalogFilter();
}

function handleSearch() {
  executeCatalogFilter();
}

function executeCatalogFilter() {
  const query = document.getElementById('offeringSearch').value.toLowerCase().trim();
  const results = programCatalog.filter(item => {
    const matchCategory = (currentFilter === 'all') || (item.type === currentFilter);
    const matchQuery = item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
    return matchCategory && matchQuery;
  });
  renderOfferingsMatrix(results);
}

// Interactive 3D Cursor Tilt for Centerpiece
function initMonolithTilt() {
  const monolith = document.getElementById('interactiveMonolith');
  if (!monolith) return;

  window.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 24;
    const y = (window.innerHeight / 2 - e.clientY) / 24;
    monolith.style.transform = `rotateY(${-x}deg) rotateX(${y}deg)`;
  });
}

// Universal Tilt for Cards
function initTiltCards() {
  const tiltBoxes = document.querySelectorAll('.tilt-box');
  tiltBoxes.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `perspective(1000px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)`;
    });
  });
}

// Interactive 3D Physics Canvas Engine with Cursor Attraction
function initAmbient3DCanvas() {
  const canvas = document.getElementById('ambient3D');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const mouse = { x: width / 2, y: height / 2, active: false };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  const nodes = [];
  const nodeCount = 45;

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2.5 + 1.5,
      originalRadius: Math.random() * 2.5 + 1.5
    });
  }

  function frameLoop() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // Mouse attraction physics
      if (mouse.active) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 180) {
          node.x += (dx / dist) * 0.8;
          node.y += (dy / dist) * 0.8;
        }
      }

      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      ctx.fillStyle = 'rgba(29, 78, 216, 0.4)';
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j++) {
        const node2 = nodes[j];
        const dist = Math.hypot(node.x - node2.x, node.y - node2.y);
        if (dist < 145) {
          ctx.strokeStyle = `rgba(29, 78, 216, ${0.14 * (1 - dist / 145)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(node2.x, node2.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frameLoop);
  }
  frameLoop();
}

// Real-Time Smart-Seal Verification Engine
function verifyCredential() {
  const queryField = document.getElementById('certQuery');
  const outputDiv = document.getElementById('verifyOutput');
  const id = queryField.value.trim();

  if (!id) {
    outputDiv.innerHTML = `<p style="color: #dc2626; margin-top: 15px; font-weight: 700;"><i class="fa-solid fa-triangle-exclamation"></i> Please enter an issued certificate number.</p>`;
    return;
  }

  outputDiv.innerHTML = `<p style="color: var(--primary); margin-top: 15px; font-weight: 700;"><i class="fa-solid fa-circle-notch fa-spin"></i> Contacting Decentralized Ledger Records...</p>`;

  const endpoint = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json`;

  fetch(endpoint)
    .then(res => res.text())
    .then(raw => {
      const parsed = JSON.parse(raw.substr(47).slice(0, -2));
      const records = parsed.table.rows;
      let matched = null;

      for (let i = 0; i < records.length; i++) {
        const cells = records[i].c;
        if (cells && cells[0] && cells[0].v && cells[0].v.toString().trim().toLowerCase() === id.toLowerCase()) {
          matched = {
            id: cells[0].v,
            name: cells[1] ? cells[1].v : "Candidate Record",
            course: cells[2] ? cells[2].v : "Program Track",
            date: cells[3] ? cells[3].v : "Authenticated Date"
          };
          break;
        }
      }

      if (matched) {
        outputDiv.innerHTML = `
          <div class="holo-seal-card">
            <div class="holo-header">
              <div>
                <span class="holo-id">${matched.id}</span>
                <h4 style="margin-top: 6px; color: #16a34a;"><i class="fa-solid fa-circle-check"></i> Authenticated Credential</h4>
                <div style="font-size: 0.72rem; color: var(--gold); font-weight: 700; margin-top: 2px;">SK SMART AI TECHNOLOGIES</div>
              </div>
              <i class="fa-solid fa-award holo-gold-icon"></i>
            </div>
            <div class="holo-row">
              <label>Candidate Name</label>
              <div>${matched.name}</div>
            </div>
            <div class="holo-row">
              <label>Specialization Program</label>
              <div>${matched.course}</div>
            </div>
            <div class="holo-row">
              <label>Issuance & Completion Date</label>
              <div>${matched.date}</div>
            </div>
          </div>
        `;
      } else {
        outputDiv.innerHTML = `
          <div style="background: #fee2e2; border: 1px solid #f87171; color: #b91c1c; padding: 16px; border-radius: 12px; margin-top: 18px; font-weight: 600;">
            <i class="fa-solid fa-circle-xmark"></i> Verification Failed: No active credentials matching "<strong>${id}</strong>".
          </div>
        `;
      }
    })
    .catch(err => {
      console.error(err);
      outputDiv.innerHTML = `<p style="color: #dc2626; margin-top: 15px; font-weight: 700;">Database communication offline. Please verify link sharing permissions.</p>`;
    });
}

// Authentication Terminal Modal
let activePortal = "";

function triggerLogin(portalRole) {
  activePortal = portalRole;
  document.getElementById('modalTitle').innerText = `${portalRole} Authentication`;
  document.getElementById('loginModal').style.display = 'flex';
}

function dismissLogin() {
  document.getElementById('loginModal').style.display = 'none';
  document.getElementById('authKeyInput').value = '';
}

function togglePassEye() {
  const input = document.getElementById('authKeyInput');
  input.type = input.type === 'password' ? 'text' : 'password';
}

function verifyAuthKey() {
  const key = document.getElementById('authKeyInput').value;

  if (activePortal === 'Admin' && key === 'santhassk') {
    dismissLogin();
    renderAdminTerminal();
  } else if (activePortal === 'Staff' && key === 'SKAITECH2026') {
    dismissLogin();
    renderUserTerminal('Staff');
  } else if (activePortal === 'Student' && key === 'skaistudent') {
    dismissLogin();
    renderUserTerminal('Student');
  } else {
    alert("Authentication Failed: Security key mismatch.");
  }
}

function renderUserTerminal(role) {
  const panel = document.getElementById('userDashboard');
  panel.style.display = 'block';
  panel.innerHTML = `
    <div class="terminal-card">
      <h2 style="color: var(--primary); margin-bottom: 4px;">SK SMART AI TECHNOLOGIES</h2>
      <h4 style="color: var(--text-muted); margin-bottom: 12px;">${role} Attendance Logger</h4>
      <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 24px;">Secure daily session attendance record.</p>
      <input type="text" id="traineeName" placeholder="Enter full registered name">
      <button class="btn-neo btn-primary-3d full-width" onclick="recordAttendance('${role}')">
        <span>Confirm Session Presence</span>
      </button>
      <button class="btn-neo btn-ghost-3d full-width" style="margin-top: 12px;" onclick="location.reload()">
        <span>Exit Terminal</span>
      </button>
    </div>
  `;
}

function recordAttendance(role) {
  const name = document.getElementById('traineeName').value.trim();
  if (!name) return alert("Please enter your name.");
  alert(`Attendance recorded successfully for ${name} [${role}].`);
  location.reload();
}

function renderAdminTerminal() {
  const panel = document.getElementById('adminDashboard');
  panel.style.display = 'block';
  panel.innerHTML = `
    <div class="terminal-card" style="max-width: 600px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
        <h2>SK SMART AI TECHNOLOGIES - Admin</h2>
        <button class="btn-neo btn-ghost-3d" onclick="location.reload()">Exit</button>
      </div>
      <p style="color: var(--text-muted); margin-bottom: 24px;">Direct master database spreadsheet management:</p>
      <button class="btn-neo btn-primary-3d full-width" onclick="window.open('https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}', '_blank')">
        <span><i class="fa-solid fa-table"></i> Open Google Cloud Sheet Database</span>
      </button>
    </div>
  `;
}
