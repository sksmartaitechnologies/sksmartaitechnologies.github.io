let masterDB = JSON.parse(localStorage.getItem('sk_tech_db')) || {
    certs: [["Student Name", "Certificate ID", "Course", "Date"]],
    staffAtt: [["Staff Name", "Date", "Time", "Status"]],
    studAtt: [["Student Name", "Date", "Time", "Status"]],
    passwords: { Staff: "SKAITECH2026", Student: "skaistudent" }
};

const adminMasterPass = "santhassk";
let currentPortal = "";

const saveToLocal = () => localStorage.setItem('sk_tech_db', JSON.stringify(masterDB));

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

// USER PORTAL (Staff/Student Attendance)
function showUserPortal(type) {
    const panel = document.getElementById('userDashboard');
    panel.style.display = 'block';
    panel.innerHTML = `
        <div class="attendance-card">
            <h2 class="accent">${type} Dashboard</h2>
            <p style="margin: 15px 0;">Welcome! Please mark your attendance for today.</p>
            <input type="text" id="userName" placeholder="Enter Your Full Name" style="border-bottom: 1px solid var(--gold); margin-bottom: 20px;">
            <button class="portal-btn" style="width:100%" onclick="markAttendance('${type}')">Mark Attendance</button>
            <button class="portal-btn" style="background:transparent; color:white; margin-top:15px;" onclick="location.reload()">Logout</button>
        </div>`;
}

function markAttendance(type) {
    const name = document.getElementById('userName').value;
    if (!name) return alert("Please enter your name");
    
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const dbKey = (type === 'Staff') ? 'staffAtt' : 'studAtt';
    
    masterDB[dbKey].push([name, date, time, "Present"]);
    saveToLocal();
    alert(`Success! Attendance marked for ${name} at ${time}`);
    location.reload();
}

// ADMIN PANEL
function showAdminPanel() {
    document.getElementById('adminDashboard').style.display = 'block';
    renderAdminPage('certs');
}

function renderAdminPage(tab) {
    const panel = document.getElementById('adminDashboard');
    let html = `
        <h3 class="accent">Management Console</h3>
        <div style="display:flex; gap:10px; overflow-x:auto; padding-bottom:10px;">
            <button class="tab-btn ${tab==='certs'?'active':''}" onclick="renderAdminPage('certs')">Certs</button>
            <button class="tab-btn ${tab==='staffAtt'?'active':''}" onclick="renderAdminPage('staffAtt')">Staff Attendance</button>
            <button class="tab-btn ${tab==='studAtt'?'active':''}" onclick="renderAdminPage('studAtt')">Student Attendance</button>
            <button class="tab-btn ${tab==='security'?'active':''}" onclick="renderAdminPage('security')">Passwords</button>
            <button class="tab-btn" style="background:red" onclick="location.reload()">Logout</button>
        </div>`;

    if(tab === 'security') {
        html += `
            <div class="card" style="text-align:left; max-width:400px; margin:20px auto;">
                <label>Staff Portal:</label><input type="text" id="newStaffP" value="${masterDB.passwords.Staff}">
                <label>Student Portal:</label><input type="text" id="newStudP" value="${masterDB.passwords.Student}">
                <button class="portal-btn" style="margin-top:20px; width:100%" onclick="updatePass()">Update Security</button>
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
                <button class="portal-btn" style="background:green; color:white" onclick="saveToLocal(); alert('Saved!')">Save Details</button>
            </div>`;
    }
    panel.innerHTML = html;
}

function updateCell(tab, r, c, val) { masterDB[tab][r][c] = val; }
function addRow(tab) { masterDB[tab].push(new Array(masterDB[tab][0].length).fill("")); renderAdminPage(tab); }
function updatePass() {
    masterDB.passwords.Staff = document.getElementById('newStaffP').value;
    masterDB.passwords.Student = document.getElementById('newStudP').value;
    saveToLocal(); alert("Passwords Updated!");
}

// Programs Data
const subjects = ["Artificial Intelligence", "Machine Learning", "Data Science", "Python", "Generative AI"];
const mainGrid = document.getElementById('mainGrid');
if (mainGrid) {
    subjects.forEach(s => {
        mainGrid.innerHTML += `<div class="card"><i class="fas fa-microchip" style="color:var(--gold); font-size:1.5rem;"></i><h3>${s}</h3></div>`;
    });
}
