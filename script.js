// Database Simulation
let db = JSON.parse(localStorage.getItem('sk_master_db')) || {
    certs: [["Student Name", "Certificate ID", "Date"]],
    staff_att: [["Staff Name", "Date", "Status"]],
    stud_att: [["Student Name", "Date", "Status"]],
    passwords: { Staff: "SKAITECH2026", Student: "skaistudent" }
};

const adminPass = "santhassk";

function saveDB() { localStorage.setItem('sk_master_db', JSON.stringify(db)); }

function togglePass(id) {
    const x = document.getElementById(id);
    x.type = x.type === "password" ? "text" : "password";
}

function openLogin(type) {
    currentPortal = type;
    document.getElementById('modalTitle').innerText = type + " Portal";
    document.getElementById('loginModal').style.display = 'flex';
}

function checkPass() {
    const input = document.getElementById('portalPass').value;
    if (currentPortal === 'Admin' && input === adminPass) {
        document.getElementById('loginModal').style.display = 'none';
        showAdmin();
    } else if (input === db.passwords[currentPortal]) {
        alert("Welcome " + currentPortal);
    } else { alert("Wrong Password"); }
}

function showAdmin() {
    const wrap = document.getElementById('adminDashboard');
    wrap.style.display = 'block';
    renderTab('certs');
}

function renderTab(tabName) {
    const wrap = document.getElementById('adminDashboard');
    let html = `
        <h2 class="accent">Admin Management</h2>
        <div class="tab-header">
            <button class="tab-btn ${tabName==='certs'?'active':''}" onclick="renderTab('certs')">Certificates</button>
            <button class="tab-btn ${tabName==='staff_att'?'active':''}" onclick="renderTab('staff_att')">Staff Attendance</button>
            <button class="tab-btn ${tabName==='stud_att'?'active':''}" onclick="renderTab('stud_att')">Student Attendance</button>
            <button class="tab-btn ${tabName==='security'?'active':''}" onclick="renderTab('security')">Security</button>
            <button class="tab-btn" style="background:red" onclick="location.reload()">Logout</button>
        </div>`;

    if(tabName === 'security') {
        html += `
            <div class="card" style="text-align:left">
                <label>Staff Password</label>
                <input type="text" id="newStaffPass" value="${db.passwords.Staff}">
                <label>Student Password</label>
                <input type="text" id="newStudPass" value="${db.passwords.Student}">
                <button class="portal-btn" onclick="updatePass()">Update Passwords</button>
            </div>`;
    } else {
        html += `
            <div style="overflow-x:auto">
                <table id="excelTable">
                    <thead><tr>${db[tabName][0].map(h => `<th>${h}</th>`).join('')}</tr></thead>
                    <tbody>
                        ${db[tabName].slice(1).map((row, rIdx) => `
                            <tr>${row.map((cell, cIdx) => `<td><input type="text" value="${cell}" onchange="updateCell('${tabName}', ${rIdx+1}, ${cIdx}, this.value)"></td>`).join('')}</tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div class="btn-group" style="margin-top:20px;">
                <button class="portal-btn" onclick="addRow('${tabName}')">+ Add Row</button>
                <button class="portal-btn" onclick="addColumn('${tabName}')">+ Add Column</button>
                <button class="portal-btn" style="background:green; color:white" onclick="saveData()">Save Details</button>
            </div>`;
    }
    wrap.innerHTML = html;
}

function updateCell(tab, r, c, val) { db[tab][r][c] = val; }

function addRow(tab) {
    db[tab].push(new Array(db[tab][0].length).fill(""));
    renderTab(tab);
}

function addColumn(tab) {
    const colName = prompt("Enter Column Header Name:");
    if(colName) {
        db[tab].forEach((row, idx) => {
            if(idx === 0) row.push(colName);
            else row.push("");
        });
        renderTab(tab);
    }
}

function updatePass() {
    db.passwords.Staff = document.getElementById('newStaffPass').value;
    db.passwords.Student = document.getElementById('newStudPass').value;
    saveDB();
    alert("Passwords Updated!");
}

function saveData() { saveDB(); alert("All changes saved to database!"); }

function manualVerify() {
    const id = document.getElementById('certId').value.trim();
    const res = document.getElementById('verifyResult');
    // Search in certs table (column 1 is ID)
    const record = db.certs.find(r => r[1] === id);
    if (record) {
        res.innerHTML = `<div class="card" style="margin-top:10px; border-color:green">✅ Verified: ${record[0]}<br>Date: ${record[2]}</div>`;
    } else { res.innerHTML = `<p style="color:red; margin-top:10px;">❌ Record Not Found</p>`; }
}
