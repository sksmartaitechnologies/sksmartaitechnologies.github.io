let db = JSON.parse(localStorage.getItem('sk_master_db')) || {
    certs: [["Student Name", "Certificate ID", "Date"]],
    staff_att: [["Staff Name", "Date", "Status"]],
    stud_att: [["Student Name", "Date", "Status"]],
    passwords: { Staff: "SKAITECH2026", Student: "skaistudent" }
};

const adminPass = "santhassk";
let currentPortal = "";

function saveDB() { localStorage.setItem('sk_master_db', JSON.stringify(db)); }

function togglePass(id, icon) {
    const x = document.getElementById(id);
    if (x.type === "password") {
        x.type = "text";
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
        x.type = "password";
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
    if (currentPortal === 'Admin' && input === adminPass) {
        closeLogin();
        showAdmin();
    } else if (input === db.passwords[currentPortal]) {
        alert("Access Granted to " + currentPortal);
    } else { alert("Incorrect Password"); }
}

function showAdmin() {
    document.getElementById('adminDashboard').style.display = 'block';
    renderTab('certs');
}

function renderTab(tabName) {
    const wrap = document.getElementById('adminDashboard');
    let html = `
        <h3 class="accent">Admin Dashboard</h3>
        <div class="tab-header">
            <button class="tab-btn ${tabName==='certs'?'active':''}" onclick="renderTab('certs')">1. Certificates</button>
            <button class="tab-btn ${tabName==='staff_att'?'active':''}" onclick="renderTab('staff_att')">2. Staff Attendance</button>
            <button class="tab-btn ${tabName==='stud_att'?'active':''}" onclick="renderTab('stud_att')">3. Student Attendance</button>
            <button class="tab-btn ${tabName==='security'?'active':''}" onclick="renderTab('security')">Security</button>
            <button class="tab-btn" style="background:#d44638" onclick="location.reload()">Logout</button>
        </div>`;

    if(tabName === 'security') {
        html += `
            <div class="card" style="text-align:left">
                <p>Change Portal Passwords:</p>
                <label>Staff Password:</label>
                <input type="text" id="newStaffP" value="${db.passwords.Staff}" style="border-bottom:1px solid var(--gold); margin-bottom:10px;">
                <label>Student Password:</label>
                <input type="text" id="newStudP" value="${db.passwords.Student}" style="border-bottom:1px solid var(--gold); margin-bottom:10px;">
                <button class="portal-btn" onclick="updateSecurity()">Save New Passwords</button>
            </div>`;
    } else {
        html += `
            <div style="overflow-x:auto">
                <table>
                    <thead><tr>${db[tabName][0].map(h => `<th>${h}</th>`).join('')}</tr></thead>
                    <tbody>
                        ${db[tabName].slice(1).map((row, rIdx) => `
                            <tr>${row.map((cell, cIdx) => `<td><input type="text" value="${cell}" onchange="edit('${tabName}', ${rIdx+1}, ${cIdx}, this.value)"></td>`).join('')}</tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div style="margin-top:15px; display:flex; gap:10px;">
                <button class="portal-btn" onclick="addRow('${tabName}')">+ Add Row</button>
                <button class="portal-btn" onclick="addColumn('${tabName}')">+ Add Column</button>
                <button class="portal-btn" style="background:green; color:white" onclick="saveData()">Save Details</button>
            </div>`;
    }
    wrap.innerHTML = html;
}

function edit(tab, r, c, v) { db[tab][r][c] = v; }
function addRow(tab) { db[tab].push(new Array(db[tab][0].length).fill("")); renderTab(tab); }
function addColumn(tab) {
    const col = prompt("Column Header:");
    if(col) {
        db[tab].forEach((row, i) => i === 0 ? row.push(col) : row.push(""));
        renderTab(tab);
    }
}
function updateSecurity() {
    db.passwords.Staff = document.getElementById('newStaffP').value;
    db.passwords.Student = document.getElementById('newStudP').value;
    saveDB(); alert("Passwords Updated!");
}
function saveData() { saveDB(); alert("Changes Saved Successfully!"); }

const subjects = ["Artificial Intelligence", "Machine Learning", "Data Science", "Python", "Generative AI"];
const mainGrid = document.getElementById('mainGrid');
if (mainGrid) {
    subjects.forEach(s => {
        mainGrid.innerHTML += `<div class="card"><i class="fas fa-microchip" style="color:var(--gold); font-size:1.5rem;"></i><h3>${s}</h3></div>`;
    });
}
