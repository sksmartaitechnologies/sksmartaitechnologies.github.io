// Database initialized with user requirements
let masterDB = JSON.parse(localStorage.getItem('sk_tech_db')) || {
    certs: [["Student Name", "Certificate ID", "Course", "Date"]],
    staffAtt: [["Staff Name", "Employee ID", "Status", "Date"]],
    studAtt: [["Student Name", "Roll No", "Status", "Date"]],
    passwords: { Staff: "SKAITECH2026", Student: "skaistudent" }
};

const adminMasterPass = "santhassk";
let currentPortal = "";

// Save function
const saveToLocal = () => localStorage.setItem('sk_tech_db', JSON.stringify(masterDB));

// Password Toggle
function togglePasswordVisibility(inputId, icon) {
    const input = document.getElementById(inputId);
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

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}

function checkPass() {
    const input = document.getElementById('portalPass').value;
    if (currentPortal === 'Admin' && input === adminMasterPass) {
        closeLogin();
        showAdminPanel();
    } else if (input === masterDB.passwords[currentPortal]) {
        alert("Welcome to " + currentPortal + " Dashboard");
    } else {
        alert("Incorrect Password");
    }
}

// Admin Management Functions
function showAdminPanel() {
    document.getElementById('adminDashboard').style.display = 'block';
    renderAdminPage('certs');
}

function renderAdminPage(tab) {
    const panel = document.getElementById('adminDashboard');
    let html = `
        <h2 class="accent">Management Console</h2>
        <div class="admin-tabs">
            <button class="tab-btn ${tab==='certs'?'active':''}" onclick="renderAdminPage('certs')">1. Certificates</button>
            <button class="tab-btn ${tab==='staffAtt'?'active':''}" onclick="renderAdminPage('staffAtt')">2. Staff Attendance</button>
            <button class="tab-btn ${tab==='studAtt'?'active':''}" onclick="renderAdminPage('studAtt')">3. Student Attendance</button>
            <button class="tab-btn ${tab==='pass'?'active':''}" onclick="renderAdminPage('pass')">Security Settings</button>
            <button class="tab-btn" style="background:red" onclick="location.reload()">Logout</button>
        </div>`;

    if(tab === 'pass') {
        html += `
            <div class="card" style="text-align:left; max-width:500px; margin:auto;">
                <h3>Set Portal Passwords</h3>
                <label>Staff Portal:</label>
                <input type="text" id="newStaffP" value="${masterDB.passwords.Staff}">
                <label style="margin-top:15px; display:block;">Student Portal:</label>
                <input type="text" id="newStudP" value="${masterDB.passwords.Student}">
                <button class="portal-btn" style="margin-top:20px; width:100%;" onclick="updatePass()">Save Passwords</button>
            </div>`;
    } else {
        html += `
            <div style="overflow-x:auto;">
                <table id="excelTable">
                    <thead><tr>${masterDB[tab][0].map(h => `<th>${h}</th>`).join('')}</tr></thead>
                    <tbody>
                        ${masterDB[tab].slice(1).map((row, rIdx) => `
                            <tr>${row.map((cell, cIdx) => `<td><input type="text" value="${cell}" onchange="updateCell('${tab}', ${rIdx+1}, ${cIdx}, this.value)"></td>`).join('')}</tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div style="margin-top:20px; display:flex; gap:10px;">
                <button class="portal-btn" onclick="addRow('${tab}')">+ Add Row</button>
                <button class="portal-btn" onclick="addCol('${tab}')">+ Add Column</button>
                <button class="portal-btn" style="background:green; color:white;" onclick="saveData()">Save Details</button>
            </div>`;
    }
    panel.innerHTML = html;
}

function updateCell(tab, r, c, val) { masterDB[tab][r][c] = val; }

function addRow(tab) {
    masterDB[tab].push(new Array(masterDB[tab][0].length).fill(""));
    renderAdminPage(tab);
}

function addCol(tab) {
    const colName = prompt("Enter Column Name:");
    if(colName) {
        masterDB[tab].forEach((r, i) => i === 0 ? r.push(colName) : r.push(""));
        renderAdminPage(tab);
    }
}

function updatePass() {
    masterDB.passwords.Staff = document.getElementById('newStaffP').value;
    masterDB.passwords.Student = document.getElementById('newStudP').value;
    saveToLocal();
    alert("Security updated!");
}

function saveData() {
    saveToLocal();
    alert("Database updated successfully!");
}

function manualVerify() {
    const id = document.getElementById('certId').value.trim();
    const result = document.getElementById('verifyResult');
    const record = masterDB.certs.find(r => r[1] === id);
    if(record && id !== "") {
        result.innerHTML = `<div style="color:#4ade80; margin-top:15px;">✅ Verified: ${record[0]} (${record[2]})</div>`;
    } else {
        result.innerHTML = `<div style="color:#ef4444; margin-top:15px;">❌ No Record Found</div>`;
    }
}

// Generate Programs
const subjects = ["Artificial Intelligence", "Machine Learning", "Data Science", "Python", "Generative AI"];
const mainGrid = document.getElementById('mainGrid');
if (mainGrid) {
    subjects.forEach(s => {
        mainGrid.innerHTML += `<div class="card"><i class="fas fa-microchip" style="color:var(--gold); font-size:1.5rem;"></i><h3>${s}</h3></div>`;
    });
}
