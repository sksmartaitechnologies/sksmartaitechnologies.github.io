let masterDB = JSON.parse(localStorage.getItem('sk_tech_db')) || {
    certs: [["Student Name", "Certificate ID", "Course", "Date"]],
    staffAtt: [["Staff Name", "Date", "Time", "Status"]],
    studAtt: [["Student Name", "Date", "Time", "Status"]],
    passwords: { Staff: "SKAITECH2026", Student: "skaistudent" }
};

const adminMasterPass = "santhassk";
let currentPortal = "";
let qrScanner = null;

const saveToLocal = () => localStorage.setItem('sk_tech_db', JSON.stringify(masterDB));

// Password Toggle
function togglePasswordVisibility(id, icon) {
    const x = document.getElementById(id);
    if (x.type === "password") { x.type = "text"; icon.classList.replace('fa-eye-slash', 'fa-eye'); }
    else { x.type = "password"; icon.classList.replace('fa-eye', 'fa-eye-slash'); }
}

// Attendance Portal Logic
function openLogin(type) {
    currentPortal = type;
    document.getElementById('modalTitle').innerText = type + " Portal";
    document.getElementById('loginModal').style.display = 'flex';
}

function checkPass() {
    const input = document.getElementById('portalPass').value;
    if (currentPortal === 'Admin' && input === adminMasterPass) {
        document.getElementById('loginModal').style.display = 'none';
        showAdminPanel();
    } else if (input === masterDB.passwords[currentPortal]) {
        document.getElementById('loginModal').style.display = 'none';
        showUserPortal(currentPortal);
    } else { alert("Incorrect Password"); }
}

function showUserPortal(type) {
    const panel = document.getElementById('userDashboard');
    panel.style.display = 'block';
    panel.innerHTML = `
        <div class="attendance-card">
            <h2 class="accent">${type} Attendance</h2>
            <p style="margin: 20px 0; color: #ccc;">Secure attendance logging with real-time timestamps.</p>
            <input type="text" id="userName" placeholder="Enter Your Full Name" style="border-bottom: 2px solid var(--gold); margin-bottom: 25px; padding: 10px;">
            <button class="portal-btn" style="width:100%" onclick="markAttendance('${type}')">Confirm Login</button>
            <button class="portal-btn" style="background:transparent; color:white; border: 1px solid white; margin-top:20px;" onclick="location.reload()">Back to Home</button>
        </div>`;
}

function markAttendance(type) {
    const name = document.getElementById('userName').value;
    if (!name) return alert("Please enter your name.");
    const now = new Date();
    const dbKey = (type === 'Staff') ? 'staffAtt' : 'studAtt';
    masterDB[dbKey].push([name, now.toLocaleDateString(), now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), "Present"]);
    saveToLocal();
    alert(`Attendance marked for ${name}.`);
    location.reload();
}

// Admin Panel Logic
function showAdminPanel() {
    document.getElementById('adminDashboard').style.display = 'block';
    renderAdminPage('certs');
}

function renderAdminPage(tab) {
    const panel = document.getElementById('adminDashboard');
    let html = `
        <h3 class="accent">Admin Dashboard</h3>
        <div style="display:flex; gap:10px; overflow-x:auto; padding-bottom:15px; margin-bottom:10px;">
            <button class="tab-btn ${tab==='certs'?'active':''}" onclick="renderAdminPage('certs')">Manage Certs</button>
            <button class="tab-btn ${tab==='staffAtt'?'active':''}" onclick="renderAdminPage('staffAtt')">Staff Logs</button>
            <button class="tab-btn ${tab==='studAtt'?'active':''}" onclick="renderAdminPage('studAtt')">Student Logs</button>
            <button class="tab-btn ${tab==='security'?'active':''}" onclick="renderAdminPage('security')">Security</button>
            <button class="tab-btn" style="background:#d44638" onclick="location.reload()">Logout</button>
        </div>`;

    if(tab === 'security') {
        html += `
            <div class="card" style="text-align:left; max-width:450px; margin:20px auto;">
                <p>Staff Access Pass:</p>
                <input type="text" id="newStaffP" value="${masterDB.passwords.Staff}">
                <p style="margin-top:10px;">Student Access Pass:</p>
                <input type="text" id="newStudP" value="${masterDB.passwords.Student}">
                <button class="portal-btn" style="margin-top:20px; width:100%" onclick="updatePass()">Update Access</button>
            </div>`;
    } else {
        html += `
            <div style="overflow-x:auto;">
                <table>
                    <thead><tr>${masterDB[tab][0].map(h => `<th>${h}</th>`).join('')}</tr></thead>
                    <tbody>
                        ${masterDB[tab].slice(1).map((row, rIdx) => `
                            <tr>${row.map((cell, cIdx) => `<td><input type="text" value="${cell}" onchange="updateCell('${tab}', ${rIdx+1}, ${cIdx}, this.value)"></td>`).join('')}</tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div style="margin-top:25px; display:flex; gap:15px; justify-content: center;">
                <button class="portal-btn" onclick="addRow('${tab}')">+ Add Manual Row</button>
                <button class="portal-btn" style="background:green; color:white" onclick="saveToLocal(); alert('Database Saved!')">Save Changes</button>
            </div>`;
    }
    panel.innerHTML = html;
}

function updateCell(tab, r, c, val) { masterDB[tab][r][c] = val; }
function addRow(tab) { masterDB[tab].push(new Array(masterDB[tab][0].length).fill("")); renderAdminPage(tab); }
function updatePass() {
    masterDB.passwords.Staff = document.getElementById('newStaffP').value;
    masterDB.passwords.Student = document.getElementById('newStudP').value;
    saveToLocal(); alert("Security Updated!");
}

// Verification Logic
function manualVerify() {
    const id = document.getElementById('certId').value.trim();
    const resultDiv = document.getElementById('verifyResult');
    const record = masterDB.certs.find(r => r[1] === id);
    if (record && id !== "") {
        resultDiv.innerHTML = `<div style="color:#4ade80; margin-top:15px; font-weight:bold;">✅ VERIFIED: ${record[0]} (${record[2]})</div>`;
    } else {
        resultDiv.innerHTML = `<div style="color:#ef4444; margin-top:15px;">❌ Invalid Certificate ID</div>`;
    }
}

function startScanner() {
    qrScanner = new Html5Qrcode("reader");
    qrScanner.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, (text) => {
        document.getElementById('certId').value = text;
        manualVerify();
        qrScanner.stop();
    }).catch(err => alert("Camera permission denied."));
}

// EXPANDED COURSE DATA
const courseData = [
    { title: "Artificial Intelligence", desc: "Master Neural Networks, NLP, and advanced AI model deployment." },
    { title: "Machine Learning", desc: "Predictive analytics, data modeling, and algorithmic implementation." },
    { title: "Deep Learning (DL)", desc: "Study multi-layered neural networks and complex pattern recognition." },
    { title: "Data Science", desc: "Comprehensive data engineering, statistical analysis, and BI strategies." },
    { title: "Cyber Security", desc: "Ethical hacking, network defense, and information security protocols." },
    { title: "Blockchain Tech", desc: "Smart contracts, decentralized ledgers, and secure crypto transactions." },
    { title: "Python Programming", desc: "Core backend development, automation scripting, and API management." },
    { title: "Power BI & Tableau", desc: "Professional business intelligence and data visualization mastery." },
    { title: "Internship Programs", desc: "Live project experience with industry mentors and certificate." },
    { title: "Expert Workshops", desc: "Short-term specialized training sessions on trending technologies." }
];

const mainGrid = document.getElementById('mainGrid');
if (mainGrid) {
    courseData.forEach(c => {
        mainGrid.innerHTML += `
            <div class="card">
                <i class="fas fa-graduation-cap" style="color:var(--gold); font-size:1.5rem; margin-bottom:10px;"></i>
                <h3>${c.title}</h3>
                <p>${c.desc}</p>
            </div>`;
    });
}
