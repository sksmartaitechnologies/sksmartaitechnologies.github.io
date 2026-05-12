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

// AUTOMATED ATTENDANCE PORTAL
function showUserPortal(type) {
    const panel = document.getElementById('userDashboard');
    panel.style.display = 'block';
    panel.innerHTML = `
        <div class="attendance-card">
            <h2 class="accent">${type} Attendance</h2>
            <p style="margin: 20px 0; color: #ccc;">Hello! Please confirm your attendance for today.</p>
            <input type="text" id="userName" placeholder="Enter Your Full Name" style="border-bottom: 2px solid var(--gold); margin-bottom: 25px; padding: 10px; font-size: 1.1rem;">
            <button class="portal-btn" style="width:100%" onclick="markAttendance('${type}')">Confirm Attendance</button>
            <button class="portal-btn" style="background:transparent; color:white; border: 1px solid white; margin-top:20px;" onclick="location.reload()">Back to Home</button>
        </div>`;
}

function markAttendance(type) {
    const name = document.getElementById('userName').value;
    if (!name) return alert("Please enter your name to proceed.");
    
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dbKey = (type === 'Staff') ? 'staffAtt' : 'studAtt';
    
    // Save to the database with live timing
    masterDB[dbKey].push([name, dateStr, timeStr, "Present"]);
    saveToLocal();
    
    alert(`Success! Attendance recorded for ${name} at ${timeStr}.`);
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
        <h3 class="accent" style="margin-bottom:20px;">Admin Command Center</h3>
        <div style="display:flex; gap:10px; overflow-x:auto; padding-bottom:15px; margin-bottom:10px;">
            <button class="tab-btn ${tab==='certs'?'active':''}" onclick="renderAdminPage('certs')">Manage Certs</button>
            <button class="tab-btn ${tab==='staffAtt'?'active':''}" onclick="renderAdminPage('staffAtt')">Staff Logs</button>
            <button class="tab-btn ${tab==='studAtt'?'active':''}" onclick="renderAdminPage('studAtt')">Student Logs</button>
            <button class="tab-btn ${tab==='security'?'active':''}" onclick="renderAdminPage('security')">Passwords</button>
            <button class="tab-btn" style="background:#d44638" onclick="location.reload()">Logout</button>
        </div>`;

    if(tab === 'security') {
        html += `
            <div class="card" style="text-align:left; max-width:450px; margin:20px auto;">
                <p style="margin-bottom:10px;">Staff Portal Password:</p>
                <input type="text" id="newStaffP" value="${masterDB.passwords.Staff}">
                <p style="margin: 10px 0;">Student Portal Password:</p>
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
                <button class="portal-btn" onclick="addRow('${tab}')">+ Add Manual Entry</button>
                <button class="portal-btn" style="background:green; color:white" onclick="saveToLocal(); alert('System Database Updated!')">Save Changes</button>
            </div>`;
    }
    panel.innerHTML = html;
}

function updateCell(tab, r, c, val) { masterDB[tab][r][c] = val; }
function addRow(tab) { masterDB[tab].push(new Array(masterDB[tab][0].length).fill("")); renderAdminPage(tab); }
function updatePass() {
    masterDB.passwords.Staff = document.getElementById('newStaffP').value;
    masterDB.passwords.Student = document.getElementById('newStudP').value;
    saveToLocal(); alert("Portal Access Keys Updated!");
}

// Generate Academic Programs
const courseData = [
    { title: "Artificial Intelligence", icon: "brain" },
    { title: "Machine Learning", icon: "robot" },
    { title: "Data Science", icon: "chart-bar" },
    { title: "Python Programming", icon: "code" },
    { title: "Generative AI", icon: "magic" }
];
const mainGrid = document.getElementById('mainGrid');
if (mainGrid) {
    courseData.forEach(c => {
        mainGrid.innerHTML += `<div class="card"><i class="fas fa-${c.icon}" style="color:var(--gold); font-size:1.8rem; margin-bottom:10px;"></i><h3>${c.title}</h3></div>`;
    });
}
