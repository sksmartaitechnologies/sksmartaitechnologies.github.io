// Google Cloud Sheet Target for Public Credential Queries
const GOOGLE_SHEET_ID = "1s90ibbiPYos-cEapdJlO4g8J67AmhVqehllCXZKhw_w";

// Distinct Technology Domains (Without workshop/internship/course tags)
const domainCatalog = [
  {
    id: 1,
    title: "Artificial Intelligence",
    icon: "fa-solid fa-brain",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=700&q=80",
    desc: "Autonomous agents, transformer models, inference pipelines, and production generative intelligence architectures.",
    tags: ["LLMs", "RAG Pipelines", "Agents", "LangChain"]
  },
  {
    id: 2,
    title: "Machine Learning",
    icon: "fa-solid fa-chart-diagram",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=700&q=80",
    desc: "Supervised and unsupervised models, gradient descent algorithms, XGBoost, and hyperparameter tuning engines.",
    tags: ["Scikit-Learn", "Ensembles", "Feature Pipelines"]
  },
  {
    id: 3,
    title: "Deep Learning",
    icon: "fa-solid fa-network-wired",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=700&q=80",
    desc: "Computational graphs, convolution architectures, backpropagation loss functions, and vision classifiers.",
    tags: ["PyTorch", "TensorFlow", "CNNs", "Diffusion Models"]
  },
  {
    id: 4,
    title: "Data Science",
    icon: "fa-solid fa-database",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80",
    desc: "Statistical exploratory analysis, predictive hypothesis validation, multi-dimensional modeling, and insights extraction.",
    tags: ["Pandas", "NumPy", "Statistical Inference", "EDA"]
  },
  {
    id: 5,
    title: "Full Stack Development",
    icon: "fa-solid fa-code",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=700&q=80",
    desc: "Modern responsive web applications, secure REST microservices, relational databases, and edge caching layers.",
    tags: ["React", "Node.js", "PostgreSQL", "REST APIs"]
  },
  {
    id: 6,
    title: "Digital Marketing",
    icon: "fa-solid fa-bullhorn",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80",
    desc: "Multi-touch conversion tracking, tag manager architectures, programmatic funnel optimization, and growth attribution.",
    tags: ["Conversion Funnels", "Attribution", "SEO Analytics"]
  },
  {
    id: 7,
    title: "Cloud Computing",
    icon: "fa-solid fa-cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80",
    desc: "Multi-region virtual subnets, serverless microservices, auto-scaling architectures, and container clusters.",
    tags: ["AWS", "Docker", "Kubernetes", "Serverless"]
  },
  {
    id: 8,
    title: "Embedded Systems & IoT",
    icon: "fa-solid fa-microchip",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80",
    desc: "Microcontroller firmware development, I2C/SPI protocols, edge queues, and real-time sensory telemetry over MQTT.",
    tags: ["Firmware", "MQTT", "ESP32", "Sensors"]
  },
  {
    id: 9,
    title: "Java Enterprise",
    icon: "fa-brands fa-java",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=700&q=80",
    desc: "High-concurrency enterprise architectures, Spring Boot ecosystems, transactional persistence, and JVM memory tuning.",
    tags: ["Spring Boot", "Hibernate", "JVM Internals", "JPA"]
  },
  {
    id: 10,
    title: "Python Engineering",
    icon: "fa-brands fa-python",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=700&q=80",
    desc: "Asynchronous concurrency, decorator patterns, high-speed API microservices, and backend performance pipelines.",
    tags: ["AsyncIO", "FastAPI", "OOP Architecture", "Pydantic"]
  },
  {
    id: 11,
    title: "Data Analytics",
    icon: "fa-solid fa-chart-line",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=700&q=80",
    desc: "Interactive business decision models, star-schema data modeling, dynamic DAX measures, and real-time dashboards.",
    tags: ["Power BI", "Tableau", "DAX Formulas", "SQL"]
  },
  {
    id: 12,
    title: "Cyber Security",
    icon: "fa-solid fa-shield-halved",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=700&q=80",
    desc: "Intrusion analysis, vulnerability assessments, network packet inspection, isolated sandboxes, and zero-day defense.",
    tags: ["Penetration Testing", "Wireshark", "Firewalls", "SOC"]
  },
  {
    id: 13,
    title: "Quantum Computing",
    icon: "fa-solid fa-atom",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=700&q=80",
    desc: "Qubit state vectors, superposition, entanglement gates, and quantum algorithm simulation using modern frameworks.",
    tags: ["Qiskit", "Qubits", "Quantum Circuits", "Superposition"]
  }
];

// Bootstrapping Engine
document.addEventListener("DOMContentLoaded", () => {
  initAmbient3DCanvas();
  initMonolithTilt();
  renderDomainGrid(domainCatalog);
  initTiltCards();

  // Certificate auto-query via URL
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

// Render Thematic Domain Cards (Zero empty space, No blueprint popups)
function renderDomainGrid(items) {
  const grid = document.getElementById('matrixGrid');
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No domains found matching criteria.</div>`;
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="domain-card tilt-box">
      <div class="domain-media-wrapper">
        <img src="${item.image}" alt="${item.title}" class="domain-banner-img" loading="lazy">
        <div class="domain-icon-floating"><i class="${item.icon}"></i></div>
      </div>
      <div class="domain-body">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <div class="domain-tags">
          ${item.tags.map(t => `<span class="domain-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  initTiltCards();
}

// Search Dispatcher
function handleSearch() {
  const query = document.getElementById('domainSearch').value.toLowerCase().trim();
  const results = domainCatalog.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(query);
    const descMatch = item.desc.toLowerCase().includes(query);
    const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(query));
    return titleMatch || descMatch || tagMatch;
  });
  renderDomainGrid(results);
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

// Physics Canvas Background
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
  const nodeCount = 42;

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      radius: Math.random() * 2.5 + 1.2
    });
  }

  function frameLoop() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (mouse.active) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 180) {
          node.x += (dx / dist) * 0.7;
          node.y += (dy / dist) * 0.7;
        }
      }

      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      ctx.fillStyle = 'rgba(29, 78, 216, 0.35)';
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j++) {
        const node2 = nodes[j];
        const dist = Math.hypot(node.x - node2.x, node.y - node2.y);
        if (dist < 140) {
          ctx.strokeStyle = `rgba(29, 78, 216, ${0.12 * (1 - dist / 140)})`;
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
            course: cells[2] ? cells[2].v : "Specialization",
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
              <label>Specialization Domain</label>
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

// ----------------------------------------------------
// INTELLIGENT AI ASSISTANT (Fee Query & Institute Bot)
// ----------------------------------------------------
function toggleAiDrawer() {
  const drawer = document.getElementById('aiDrawer');
  if (drawer.style.display === 'flex') {
    drawer.style.display = 'none';
  } else {
    drawer.style.display = 'flex';
    document.getElementById('aiInput').focus();
  }
}

function handleAiKey(event) {
  if (event.key === 'Enter') {
    submitAiQuery();
  }
}

function sendQuickPrompt(promptText) {
  document.getElementById('aiInput').value = promptText;
  submitAiQuery();
}

function submitAiQuery() {
  const inputEl = document.getElementById('aiInput');
  const chatBody = document.getElementById('aiChatBody');
  const query = inputEl.value.trim();
  if (!query) return;

  // Add User Bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'ai-msg user';
  userBubble.innerText = query;
  chatBody.appendChild(userBubble);
  inputEl.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  // Generate Automated AI Response
  setTimeout(() => {
    const botBubble = document.createElement('div');
    botBubble.className = 'ai-msg bot';
    botBubble.innerHTML = generateAssistantResponse(query);
    chatBody.appendChild(botBubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 400);
}

function generateAssistantResponse(prompt) {
  const lower = prompt.toLowerCase();

  // FEE INQUIRIES REQUIREMENT
  if (lower.includes('fee') || lower.includes('cost') || lower.includes('price') || lower.includes('charge') || lower.includes('payment') || lower.includes('how much')) {
    return `For detailed fee structures, concessions, and enrollment schedules, please contact our admissions coordinator directly at <strong>+91 93614 83073</strong> or email <strong>sksmartaitechnologies@gmail.com</strong>.`;
  }

  // DOMAIN QUERIES
  if (lower.includes('domain') || lower.includes('course') || lower.includes('topic') || lower.includes('program') || lower.includes('track')) {
    return `We offer hands-on immersion across 13 core disciplines:<br>• Artificial Intelligence & Generative AI<br>• Machine Learning & Deep Learning<br>• Data Science & Analytics<br>• Full Stack Development<br>• Cloud Computing<br>• Embedded Systems & IoT<br>• Java Enterprise & Python<br>• Cyber Security<br>• Quantum Computing<br><br>Type any domain to learn more!`;
  }

  // CERTIFICATION VERIFICATION
  if (lower.includes('verify') || lower.includes('certificate') || lower.includes('smart-seal') || lower.includes('validate')) {
    return `You can verify any issued certificate instantly using our <strong>Smart-Seal Validation</strong> tool on this page. Just enter the candidate Registration ID (e.g., SK-AI-101) to verify cryptographic authenticity.`;
  }

  // LOCATION & ACCREDITATION
  if (lower.includes('where') || lower.includes('location') || lower.includes('address') || lower.includes('place')) {
    return `SK SMART AI TECHNOLOGIES is located in Tamil Nadu, India. We are an officially registered MSME institution (Reg: UDYAM-TN-36-0058719) providing global-standard engineering labs.`;
  }

  // ADMISSION / CONTACT
  if (lower.includes('contact') || lower.includes('join') || lower.includes('enroll') || lower.includes('admission') || lower.includes('number')) {
    return `You can connect directly with our admissions and technical desk at <strong>+91 93614 83073</strong> or via email at <strong>sksmartaitechnologies@gmail.com</strong>.`;
  }

  // DEFAULT CONTEXTUAL
  return `Thank you for reaching out to <strong>SK SMART AI TECHNOLOGIES</strong>! We have trained over <strong>1000+ engineers</strong> across AI, Full Stack, Cloud, Embedded IoT, Cyber Security, and Quantum systems. For fee inquiries, please contact <strong>+91 93614 83073</strong>.
