// Database initialized with user requirements
let masterDB = JSON.parse(localStorage.getItem('sk_tech_db')) || {
    certs: [["Student Name", "Certificate ID", "Course", "Date"]],
    staffAtt: [["Staff Name", "Employee ID", "Status", "Date"]],
    studAtt: [["Student Name", "Roll No", "Status", "Date"]],
    passwords: { Staff: "SKAITECH2026", Student: "skaistudent" }
};

const adminMasterPass = "santhassk";
let currentPortal = "";
let qrScanner = null;

// Program Data with Descriptions
const programData = [
    { name: "Artificial Intelligence", desc: "Master Neural Networks, Deep Learning, and AI model deployment for industry automation." },
    { name: "Machine Learning", desc: "Predictive analytics, data modeling, and algorithmic implementation using Python libraries." },
    { name: "Data Science", desc: "End-to-end data processing, visualization, and statistical analysis for business intelligence." },
    { name: "Python Programming", desc: "Core backend development mastery including automation, scripting, and Django frameworks." },
    { name: "Generative AI", desc: "Learn Prompt Engineering, LLM fine-tuning, and building creative AI applications." }
];

// Load Programs into Grid
const mainGrid = document.getElementById('mainGrid');
if (mainGrid) {
    programData.forEach(p => {
        mainGrid.innerHTML += `
            <div class="card">
                <i class="fas fa-microchip" style="color:var(--gold); font-size:1.8rem; margin-bottom:15px;"></i>
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
            </div>`;
    });
}

// QR Code Scanner Functionality
function startScanner() {
    qrScanner = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    qrScanner.start(
        { facingMode: "environment" }, 
        config, 
        (decodedText) => {
            document.getElementById('certId').value = decodedText;
            manualVerify();
            stopScanner();
        }
    ).catch(err => {
        alert("Camera access denied or error occurred.");
    });
}

function stopScanner() {
    if (qrScanner) {
        qrScanner.stop().then(() => {
            document.getElementById('reader').innerHTML = "";
        });
    }
}

// Verification Logic
function manualVerify() {
    const id = document.getElementById('certId').value.trim();
    const resultDiv = document.getElementById('verifyResult');
    const record = masterDB.certs.find(r => r[1] === id);
    
    if (record && id !== "") {
        resultDiv.innerHTML = `
            <div style="background:rgba(74, 222, 128, 0.1); border:1px solid #4ade80; padding:15px; border-radius:10px; margin-top:20px;">
                <p style="color:#4ade80; font-weight:bold;">✅ VERIFIED RECORD</p>
                <p>Student: <strong>${record[0]}</strong></p>
                <p>Course: ${record[2]}</p>
                <p>Date: ${record[3]}</p>
            </div>`;
    } else {
        resultDiv.innerHTML = `<p style="color:#ef4444; margin-top:20px;">❌ Invalid ID: No record found.</p>`;
    }
}

// --- ADMIN SYSTEM ---
const saveToLocal = () => localStorage.setItem('sk_tech_db', JSON.stringify(masterDB));

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
    currentPortal = type;
    document.getElementById('modalTitle').innerText = type + " Portal";
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLogin() { document.getElementById('loginModal').style.display = 'none'; }

function checkPass() {
    const input = document.getElementById('portalPass').value;
    if (currentPortal === 'Admin' && input === adminMasterPass) {
        closeLogin();
        showAdminPanel();
    } else if (input === masterDB.passwords[currentPortal]) {
        alert("Welcome to " + currentPortal);
    } else {
        alert("Incorrect Password");
    }
}

function showAdminPanel() {
    document.getElementById('adminDashboard').style.display = 'block';
    renderAdminPage('certs');
}

function renderAdminPage(tab) {
    const panel = document.getElementById('adminDashboard');
    let html = `
        <h2 class="accent">Admin Management</h2>
        <div class="admin-tabs">
            <button class="tab-btn ${tab==='certs'?'active':''}" onclick="renderAdminPage('certs')">1. Certificates</button>
            <button class="tab-btn ${tab==='staffAtt'?'active':''}" onclick="renderAdminPage('staffAtt')">2. Staff Attendance</button>
            <button class="tab-btn ${tab==='studAtt'?'active':''}" onclick="renderAdminPage('studAtt')">3. Student Attendance</button>
            <button class="tab-btn ${tab==='pass'?'active':''}" onclick="renderAdminPage('pass')">Security</button>
            <button class="tab-btn" style="background:red" onclick="location.reload()">Logout</button>
        </div>`;

    if(tab === 'pass') {
        html += `
            <div class="card" style="text-align:left; max-width:500px; margin:auto;">
                <p>Change Portal Passwords:</p>
                <input type="text" id="newStaffP" value="${masterDB.passwords.Staff}">
                <input type="text" id="newStudP" value="${masterDB.passwords.Student}">
                <button class="portal-btn" style="margin-top:20px; width:100%;" onclick="updatePass()">Update Security</button>
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
            <div style="margin-top:20px; display:flex; gap:10px;">
                <button class="portal-btn" onclick="addRow('${tab}')">+ Row</button>
                <button class="portal-btn" style="background:green; color:white;" onclick="saveData()">Save Details</button>
            </div>`;
    }
    panel.innerHTML = html;
}

function updateCell(tab, r, c, val) { masterDB[tab][r][c] = val; }
function addRow(tab) { masterDB[tab].push(new Array(masterDB[tab][0].length).fill("")); renderAdminPage(tab); }
function updatePass() {
    masterDB.passwords.Staff = document.getElementById('newStaffP').value;
    masterDB.passwords.Student = document.getElementById('newStudP').value;
    saveToLocal();
    alert("Passwords updated!");
}
function saveData() { saveToLocal(); alert("Database updated!"); }
