// Master Database - Stores everything in the browser's Local Storage
let db = JSON.parse(localStorage.getItem('sk_master_db')) || {
    certs: [["Student Name", "Certificate ID", "Course Date"]],
    staff_att: [["Staff Name", "Date", "Status"]],
    stud_att: [["Student Name", "Date", "Status"]],
    passwords: { Staff: "SKAITECH2026", Student: "skaistudent" }
};

const adminPass = "santhassk";
let currentPortal = "";

// Save current data to LocalStorage
function saveDB() {
    localStorage.setItem('sk_master_db', JSON.stringify(db));
}

// Password Visibility Toggle
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

// Portal Login Logic
function openLogin(type) {
    currentPortal = type;
    document.getElementById('modalTitle').innerText = type + " Portal";
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('portalPass').value = "";
}

function checkPass() {
    const input = document.getElementById('portalPass').value;
    if (currentPortal === 'Admin' && input === adminPass) {
        closeLogin();
        showAdmin();
    } else if (input === db.passwords[currentPortal]) {
        alert("Access Granted: Welcome to the " + currentPortal + " Portal.");
        closeLogin();
    } else {
        alert("Incorrect Password. Please try again.");
    }
}

// --- ADMIN DASHBOARD LOGIC ---

function showAdmin() {
    const dashboard = document.getElementById('adminDashboard');
    dashboard.style.display = 'block';
    renderTab('certs'); // Default to first page
}

function renderTab(tabName) {
    const wrap = document.getElementById('adminDashboard');
    let html = `
        <div class="admin-nav">
            <h3 class="accent">Admin Management</h3>
            <div class="tab-header">
                <button class="tab-btn ${tabName==='certs'?'active':''}" onclick="renderTab('certs')">1. Certificates</button>
                <button class="tab-btn ${tabName==='staff_att'?'active':''}" onclick="renderTab('staff_att')">2. Staff Attendance</button>
                <button class="tab-btn ${tabName==='stud_att'?'active':''}" onclick="renderTab('stud_att')">3. Student Attendance</button>
                <button class="tab-btn ${tabName==='security'?'active':''}" onclick="renderTab('security')">Security</button>
                <button class="tab-btn" style="background:#d44638" onclick="location.reload()">Logout</button>
            </div>
        </div>`;

    if(tabName === 'security') {
        html += `
            <div class="card" style="text-align:left; max-width:500px; margin:20px auto;">
                <p style="margin-bottom:15px; color:var(--gold);">Update Portal Access Passwords:</p>
                <label>Set Staff Password:</label>
                <input type="text" id="newStaffP" value="${db.passwords.Staff}" style="border-bottom:1px solid var(--gold); margin-bottom:20px;">
                <label>Set Student Password:</label>
                <input type="text" id="newStudP" value="${db.passwords.Student}" style="border-bottom:1px solid var(--gold); margin-bottom:20px;">
                <button class="portal-btn" onclick="updateSecurity()" style="width:100%">Save New Passwords</button>
            </div>`;
    } else {
        html += `
            <div class="excel-container" style="overflow-x:auto;">
                <table id="adminTable">
                    <thead>
                        <tr>${db[tabName][0].map(h => `<th>${h}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
                        ${db[tabName].slice(1).map((row, rIdx) => `
                            <tr>
                                ${row.map((cell, cIdx) => `
                                    <td><input type="text" value="${cell}" onchange="editCell('${tabName}', ${rIdx+1}, ${cIdx}, this.value)"></td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div class="admin-actions" style="margin-top:20px; display:flex; gap:10px; justify-content:center;">
                <button class="portal-btn" onclick="addRow('${tabName}')">+ Add Row</button>
                <button class="portal-btn" onclick="addColumn('${tabName}')">+ Add Column</button>
                <button class="portal-btn" style="background:green; color:white" onclick="saveData()">Save Details</button>
            </div>`;
    }
    wrap.innerHTML = html;
}

// Excel Table Functions
function editCell(tab, r, c, val) {
    db[tab][r][c] = val;
}

function addRow(tab) {
    const newRow = new Array(db[tab][0].length).fill("");
    db[tab].push(newRow);
    renderTab(tab);
}

function addColumn(tab) {
    const colName = prompt("Enter New Column Name:");
    if (colName) {
        db[tab].forEach((row, index) => {
            if (index === 0) row.push(colName);
            else row.push("");
        });
        renderTab(tab);
    }
}

function updateSecurity() {
    db.passwords.Staff = document.getElementById('newStaffP').value;
    db.passwords.Student = document.getElementById('newStudP').value;
    saveDB();
    alert("Portal passwords have been updated successfully!");
}

function saveData() {
    saveDB();
    alert("Excel details saved to the database!");
}

// Verification Logic for Homepage
function manualVerify() {
    const id = document.getElementById('certId').value.trim();
    const res = document.getElementById('verifyResult');
    // Search in the Certificates table (Page 1)
    const record = db.certs.find(row => row[1] === id);
    
    if (record && id !== "") {
        res.innerHTML = `
            <div style="background:rgba(74, 222, 128, 0.1); border:1px solid #4ade80; padding:15px; border-radius:10px; margin-top:15px;">
                <p style="color:#4ade80; font-weight:bold;">✅ VERIFIED RECORD</p>
                <p>Student: <strong>${record[0]}</strong></p>
                <p>Course Date: ${record[2]}</p>
            </div>`;
    } else {
        res.innerHTML = `<p style="color:#ef4444; margin-top:15px;">❌ No certificate found with this ID.</p>`;
    }
}

// Load dynamic subjects into the grid
const subjects = [
    "Artificial Intelligence", "Machine Learning", "Data Science", 
    "Python Programming", "Deep Learning", "Generative AI"
];

const mainGrid = document.getElementById('mainGrid');
if (mainGrid) {
    subjects.forEach(s => {
        mainGrid.innerHTML += `
            <div class="card">
                <i class="fas fa-microchip" style="color:var(--gold); font-size:1.5rem; margin-bottom:10px;"></i>
                <h3>${s}</h3>
                <p>Industrial certification course.</p>
            </div>`;
    });
        }
