const GOOGLE_SHEET_ID = "1s90ibbiPYos-cEapdJlO4g8J67AmhVqehllCXZKhw_w";

let masterDB = JSON.parse(localStorage.getItem('sk_tech_db')) || {
    staffAtt: [["Staff Name", "Date", "Time", "Status"]],
    studAtt: [["Student Name", "Date", "Time", "Status"]],
    passwords: { Staff: "SKAITECH2026", Student: "skaistudent" }
};

const adminMasterPass = "santhassk";
let currentPortal = "";
const saveToLocal = () => localStorage.setItem('sk_tech_db', JSON.stringify(masterDB));

const courseData = [
    { title: "Artificial Intelligence", desc: "Master Neural Networks and AI deployment." },
    { title: "Machine Learning", desc: "Predictive analytics and data modeling." },
    { title: "Deep Learning (DL)", desc: "Study complex neural network patterns." },
    { title: "Data Science", desc: "End-to-end data processing and BI strategies." },
    { title: "Cyber Security", desc: "Ethical hacking and network defense." },
    { title: "Blockchain Tech", desc: "Smart contracts and crypto ledgers." },
    { title: "Python Programming", desc: "Backend mastery and automation scripting." },
    { title: "Power BI & Tableau", desc: "Professional BI and visualization." },
    { title: "Cloud Computing", desc: "Architect scalable serverless computing infrastructures and deployment frameworks." },
    { title: "Internet of Things", desc: "Design smart connected node network architectures." },
    { title: "Embedded IoT", desc: "Program microcontrollers and operational firmware protocols." },
    { title: "Financial Analyst", desc: "Master corporate valuation models and macroeconomic indicators." },
    { title: "Digital Marketing", desc: "Build ROI-focused multi-channel consumer engagement campaigns." },
    { title: "Financial Data Engineering", desc: "Architect high-frequency time-series pipelines for market data." },
    { title: "Banking Analytics", desc: "Deploy classification models to predict loan default metrics." },
    { title: "Next-Gen FinTech", desc: "Develop secure distributed ledger layers for investment." },
    { title: "Data Analytics", desc: "Translate historical metrics into clear corporate strategy trends." },
    { title: "Data Engineer", desc: "Construct multi-gigabyte ingestion networks and transformations." },
    { title: "Full Stack Development", desc: "Engineer comprehensive client-side interfaces and backend logic." },
    { title: "Web Development", desc: "Design elegant modern applications with responsive grid configurations." }
];

window.onload = function() {
    const mainGrid = document.getElementById('mainGrid');
    if (mainGrid) {
        mainGrid.innerHTML = "";
        courseData.forEach(c => {
            mainGrid.innerHTML += `<div class="card"><h3>${c.title}</h3><p>${c.desc}</p></div>`;
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const certIdFromUrl = urlParams.get('id');
    if (certIdFromUrl) {
        document.getElementById('certId').value = certIdFromUrl;
        setTimeout(() => { manualVerify(); }, 300);
    }
};

function togglePasswordVisibility(id, icon) {
    const x = document.getElementById(id);
    if (x.type === "password") { x.type = "text"; icon.classList.replace('fa-eye-slash', 'fa-eye'); }
    else { x.type = "password"; icon.classList.replace('fa-eye', 'fa-eye-slash'); }
}

function openLogin(type) {
    currentPortal = type;
    document.getElementById('modalTitle').innerText = type + " Portal";
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLogin() { document.getElementById('loginModal').style.display = 'none'; }

function checkPass() {
    const input = document.getElementById('portalPass').value;
    if (currentPortal === 'Admin' && input === adminMasterPass) {
        closeLogin(); showAdminPanel();
    } else if (input === masterDB.passwords[currentPortal]) {
        closeLogin(); showUserPortal(currentPortal);
    } else { alert("Incorrect Password"); }
}

function showUserPortal(type) {
    const panel = document.getElementById('userDashboard');
    panel.style.display = 'block';
    panel.innerHTML = `
        <div class="attendance-card">
            <h2 class="accent">${type} Attendance</h2>
            <input type="text" id="userName" placeholder="Type Full Name">
            <button class="portal-btn" style="width:100%; margin-top:25px;" onclick="markAttendance('${type}')">Confirm Login</button>
            <button class="portal-btn" style="background:transparent; color:white; border: 1px solid white; margin-top:15px; width:100%;" onclick="location.reload()">Back to Home</button>
        </div>`;
}

function markAttendance(type) {
    const name = document.getElementById('userName').value.trim();
    if (!name) return alert("Please enter your name.");
    const now = new Date();
    const dbKey = (type === 'Staff') ? 'staffAtt' : 'studAtt';
    masterDB[dbKey].push([name, now.toLocaleDateString(), now.toLocaleTimeString(), "Present"]);
    saveToLocal();
    alert(`Attendance marked successfully for ${name}.`);
    location.reload();
}

function showAdminPanel() {
    document.getElementById('adminDashboard').style.display = 'block';
    renderAdminPage('staffAtt');
}

function renderAdminPage(tab) {
    const panel = document.getElementById('adminDashboard');
    let html = `
        <h3 class="accent">Management Control Panel</h3>
        <div style="display:flex; gap:10px; margin:20px 0;">
            <button class="tab-btn" onclick="renderAdminPage('staffAtt')">Staff Logs</button>
            <button class="tab-btn" onclick="renderAdminPage('studAtt')">Student Logs</button>
            <button class="tab-btn" onclick="location.reload()">Logout</button>
        </div>`;
    
    if (tab === 'staffAtt' || tab === 'studAtt') {
        html += `<table><thead><tr>${masterDB[tab][0].map(h => `<th>${h}</th>`).join('')}</tr></thead>
                 <tbody>${masterDB[tab].slice(1).map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    }
    panel.innerHTML = html;
}

function manualVerify() {
    const id = document.getElementById('certId').value.trim();
    const resultDiv = document.getElementById('verifyResult');
    if (!id) return;
    resultDiv.innerHTML = `<p style="color:var(--gold);">Verifying...</p>`;
    
    fetch(`https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json`)
        .then(res => res.text())
        .then(data => {
            const tempJson = JSON.parse(data.substr(47).slice(0, -2));
            const rows = tempJson.table.rows;
            let record = rows.find(r => r.c[0] && r.c[0].v.toString() === id);
            if (record) {
                resultDiv.innerHTML = `<p style="color:#4ade80;">✅ VERIFIED: ${record.c[1].v} - ${record.c[2].v}</p>`;
            } else {
                resultDiv.innerHTML = `<p style="color:#ef4444;">❌ Invalid Certificate ID</p>`;
            }
        });
}
