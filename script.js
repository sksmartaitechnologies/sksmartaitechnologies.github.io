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

// Auto-verify URL Query Parameters Logic
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const certIdFromUrl = urlParams.get('id');
    if (certIdFromUrl) {
        const verifySection = document.getElementById('verify');
        if (verifySection) verifySection.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('certId').value = certIdFromUrl;
        manualVerify();
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
            <p style="margin: 20px 0; color: #ccc;">Secure institutional attendance logger.</p>
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
    masterDB[dbKey].push([name, now.toLocaleDateString(), now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), "Present"]);
    saveToLocal();
    alert(`Attendance marked successfully for ${name}.`);
    location.reload();
}

function showAdminPanel() {
    document.getElementById('adminDashboard').style.display = 'block';
    renderAdminPage('certs');
}

function renderAdminPage(tab) {
    const panel = document.getElementById('adminDashboard');
    let html = `
        <h3 class="accent" style="margin-bottom:20px;">Management Control Panel</h3>
        <div style="display:flex; gap:10px; overflow-x:auto; padding-bottom:15px; margin-bottom:10px;">
            <button class="tab-btn ${tab==='certs'?'active':''}" onclick="renderAdminPage('certs')">Certs Database</button>
            <button class="tab-btn ${tab==='staffAtt'?'active':''}" onclick="renderAdminPage('staffAtt')">Staff Logs</button>
            <button class="tab-btn ${tab==='studAtt'?'active':''}" onclick="renderAdminPage('studAtt')">Student Logs</button>
            <button class="tab-btn ${tab==='security'?'active':''}" onclick="renderAdminPage('security')">Access Passwords</button>
            <button class="tab-btn" style="background:#d44638;" onclick="location.reload()">System Logout</button>
        </div>`;

    if(tab === 'security') {
        html += `
            <div class="card" style="text-align:left; max-width:400px; margin:20px 0;">
                <p style="margin-bottom:5px; font-weight:bold;">Staff Portal Password:</p>
                <input type="text" id="newStaffP" value="${masterDB.passwords.Staff}" style="width:100%; padding:10px; background:rgba(0,0,0,0.3); border:1px solid var(--gold); color:white; border-radius:4px; margin-bottom:15px; outline:none;">
                <p style="margin-bottom:5px; font-weight:bold;">Student Portal Password:</p>
                <input type="text" id="newStudP" value="${masterDB.passwords.Student}" style="width:100%; padding:10px; background:rgba(0,0,0,0.3); border:1px solid var(--gold); color:white; border-radius:4px; outline:none;">
                <button class="portal-btn" style="margin-top:20px; width:100%" onclick="updatePass()">Update Access Credentials</button>
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
            <div style="margin-top:25px; display:flex; gap:15px;">
                <button class="portal-btn" onclick="addRow('${tab}')">+ Add Sheet Row</button>
                <button class="portal-btn" style="background:green; color:white" onclick="saveToLocal(); alert('System Database Saved Successfully!')">Commit Changes</button>
            </div>`;
    }
    panel.innerHTML = html;
}

function updateCell(tab, r, c, val) { masterDB[tab][r][c] = val; }
function addRow(tab) { masterDB[tab].push(new Array(masterDB[tab][0].length).fill("")); renderAdminPage(tab); }
function updatePass() {
    masterDB.passwords.Staff = document.getElementById('newStaffP').value;
    masterDB.passwords.Student = document.getElementById('newStudP').value;
    saveToLocal(); alert("Access Credentials Updated Successfully!");
}

function manualVerify() {
    const id = document.getElementById('certId').value.trim();
    const resultDiv = document.getElementById('verifyResult');
    const record = masterDB.certs.find(r => r[1] === id);
    if (record && id !== "") {
        resultDiv.innerHTML = `<p style="color:#4ade80; margin-top:20px; font-weight:bold; font-size:1.1rem;">✅ VERIFIED CREDENTIAL: ${record[0]} (${record[2]})</p>`;
    } else { resultDiv.innerHTML = `<p style="color:#ef4444; margin-top:20px; font-weight:bold;">❌ Invalid Record or Certificate ID Not Found</p>`; }
}

// Optimized HTTPS-Secure Camera Initialization Logic
function startScanner() {
    const readerDiv = document.getElementById('reader');
    if (!readerDiv) return;
    if (qrScanner) { qrScanner.clear(); }
    
    qrScanner = new Html5Qrcode("reader");
    const config = { 
        fps: 15, 
        qrbox: function(viewfinderWidth, viewfinderHeight) {
            const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
            return { width: Math.floor(minEdge * 0.65), height: Math.floor(minEdge * 0.65) };
        }
    };

    qrScanner.start(
        { facingMode: "environment" }, 
        config, 
        (text) => {
            document.getElementById('certId').value = text;
            manualVerify();
            qrScanner.stop().then(() => qrScanner.clear());
        },
        (errorMessage) => { /* Frame processing fallback hook */ }
    ).catch(err => {
        console.error("Camera Hardware Exception:", err);
        alert("Camera Deployment Error: Ensure your browser is utilizing an HTTPS protocol connection and permission rules are explicitly allowed for this domain.");
    });
}

// Institutional Curriculum Configuration
const courseData = [
    { title: "Artificial Intelligence", desc: "Master Neural Networks and AI deployment." },
    { title: "Machine Learning", desc: "Predictive analytics and data modeling." },
    { title: "Deep Learning (DL)", desc: "Study complex neural network patterns." },
    { title: "Data Science", desc: "End-to-end data processing and BI strategies." },
    { title: "Cyber Security", desc: "Ethical hacking and network defense." },
    { title: "Blockchain Tech", desc: "Smart contracts and crypto ledgers." },
    { title: "Python Programming", desc: "Backend mastery and automation scripting." },
    { title: "Power BI & Tableau", desc: "Professional BI and visualization." }
];

const mainGrid = document.getElementById('mainGrid');
if (mainGrid) {
    courseData.forEach(c => {
        mainGrid.innerHTML += `<div class="card"><h3>${c.title}</h3><p>${c.desc}</p></div>`;
    });
}
