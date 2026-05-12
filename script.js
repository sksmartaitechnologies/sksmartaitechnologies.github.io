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
const courseData = [
    { title: "Artificial Intelligence", desc: "Master neural networks, deep learning, and advanced AI algorithms for real-world automation." },
    { title: "Machine Learning", desc: "Predictive modeling and data patterns using Scikit-Learn, Random Forests, and Regression." },
    { title: "Data Science", desc: "End-to-end data pipelines, exploratory analysis, and visualization for business intelligence." },
    { title: "Python Programming", desc: "Core language mastery including NumPy, Pandas, and backend development frameworks." },
    { title: "Generative AI", desc: "Learn to build and fine-tune LLMs, prompt engineering, and creative AI applications." }
];

// Initialize Course Grid
const mainGrid = document.getElementById('mainGrid');
if (mainGrid) {
    courseData.forEach(course => {
        mainGrid.innerHTML += `
            <div class="card">
                <i class="fas fa-microchip" style="color:var(--gold); font-size:1.8rem; margin-bottom:15px;"></i>
                <h3>${course.title}</h3>
                <p>${course.desc}</p>
            </div>`;
    });
}

// Password Visibility Logic
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

// QR Scanner Logic
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
        alert("Camera permission denied or not found.");
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
        resultDiv.innerHTML = `<p style="color:#ef4444; margin-top:20px;">❌ Record Not Found</p>`;
    }
}

// --- ADMIN FUNCTIONS (UNCHANGED) ---
function saveToLocal() { localStorage.setItem('sk_tech_db', JSON.stringify(masterDB)); }

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
    } else { alert("Incorrect Password"); }
}

function showAdminPanel() {
    document.getElementById('adminDashboard').style.display = 'block';
    renderAdminPage('certs');
}

function renderAdminPage(tab) {
    const panel = document.getElementById('adminDashboard');
    let html = `
        <h3 class="accent" style="margin-bottom:15px;">Admin Dashboard</h3>
        <div class="tab-header">
            <button class="tab-btn ${tab==='certs'?'active':''}" onclick="renderAdminPage('certs')">Certs</button>
            <button class="tab-btn ${tab==='staffAtt'?'active':''}" onclick="renderAdminPage('staffAtt')">Staff Attendance</button>
            <button class="tab-btn ${tab==='studAtt'?'active':''}" onclick="renderAdminPage('studAtt')">Student Attendance</button>
            <button class="tab-btn ${tab==='security'?'active':''}" onclick="renderAdminPage('security')">Passwords</button>
            <button class="tab-btn" style="background:red" onclick="location.reload()">Logout</button>
        </div>`;

    if(tab === 'security') {
        html += `
            <div class="card" style="text-align:left; max-width:400px; margin: 20px auto;">
                <label>Staff Portal Pass:</label>
                <input type="text" id="newStaffP" value="${masterDB.passwords.Staff}">
                <label style="display:block; margin-top:10px;">Student Portal Pass:</label>
                <input type="text" id="newStudP" value="${masterDB.passwords.Student}">
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
function saveData() { saveToLocal(); alert("All changes saved!"); }
