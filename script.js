// List of Academic Programs
const subjects = [
    "Artificial Intelligence", 
    "Machine Learning", 
    "Deep Learning", 
    "Data Science", 
    "Python Programming", 
    "Blockchain", 
    "NLP", 
    "Computer Vision", 
    "Generative AI"
];

// Initialize the Course Grid on the homepage
const mainGrid = document.getElementById('mainGrid');
if (mainGrid) {
    subjects.forEach(s => {
        mainGrid.innerHTML += `
            <div class="card">
                <i class="fas fa-microchip" style="color:var(--gold); font-size:2rem; margin-bottom:15px;"></i>
                <h3>${s}</h3>
                <p>Advanced curriculum-based training focused on practical skills.</p>
            </div>`;
    });
}

// Security Configuration for Portals
const passes = { 
    Admin: "santhassk", 
    Staff: "SKAITECH2026", 
    Student: "skaistudent" 
};
let currentPortal = "";

// Function to open the login modal
function openLogin(type) {
    currentPortal = type;
    document.getElementById('modalTitle').innerText = type + " Portal";
    document.getElementById('loginModal').style.display = 'flex';
}

// Function to close the login modal
function closeLogin() {
    document.getElementById('modalModal').style.display = 'none';
    document.getElementById('portalPass').value = "";
}

// Function to verify passwords
function checkPass() {
    const input = document.getElementById('portalPass').value;
    if (input === passes[currentPortal]) {
        closeLogin();
        if (currentPortal === 'Admin') {
            showAdmin();
        } else {
            alert("Access granted to " + currentPortal + " Dashboard.");
        }
    } else {
        alert("Invalid Password. Access Denied.");
    }
}

// Admin Dashboard - Issue Certificates
function showAdmin() {
    document.getElementById('hero').innerHTML = `
        <div class="container" style="background:var(--royal-blue); padding:40px; border-radius:15px; border:1px solid var(--gold);">
            <h2 class="accent">Admin Command Center</h2>
            <div style="text-align:left; margin-top:20px;">
                <label>Student Full Name</label>
                <input type="text" id="sName" placeholder="Enter Name">
                <label style="display:block; margin-top:10px;">Certificate ID</label>
                <input type="text" id="sID" placeholder="e.g. SKS-2026-001">
                <button class="portal-btn" style="margin-top:20px; width:100%;" onclick="issue()">Issue & Save Certificate</button>
                <button class="portal-btn" style="background:#ef4444; color:white; margin-top:15px; width:100%;" onclick="location.reload()">Logout</button>
            </div>
        </div>`;
}

// Save Certificate to Local Database
function issue() {
    const n = document.getElementById('sName').value;
    const i = document.getElementById('sID').value;
    if (n && i) {
        const db = JSON.parse(localStorage.getItem('sk_db') || '{}');
        db[i] = { 
            name: n, 
            date: new Date().toLocaleDateString() 
        };
        localStorage.setItem('sk_db', JSON.stringify(db));
        alert("Digital Certificate successfully issued for " + n);
        document.getElementById('sName').value = "";
        document.getElementById('sID').value = "";
    } else {
        alert("Please fill in both fields.");
    }
}

// Manual Certificate Verification
function manualVerify() {
    const id = document.getElementById('certId').value.trim();
    const db = JSON.parse(localStorage.getItem('sk_db') || '{}');
    const res = document.getElementById('verifyResult');
    
    if (db[id]) {
        res.innerHTML = `
            <div style="background:rgba(74, 222, 128, 0.1); border:1px solid #4ade80; padding:15px; border-radius:10px; margin-top:20px;">
                <p style="color:#4ade80; font-weight:bold;">✅ VERIFIED CERTIFICATE</p>
                <p>Student: <strong>${db[id].name}</strong></p>
                <p>Issued Date: ${db[id].date}</p>
            </div>`;
    } else {
        res.innerHTML = `<p style="color:#ef4444; margin-top:20px;">❌ Certificate ID Not Found</p>`;
    }
}

// QR Code Scanner Logic
function startScanner() {
    const scanner = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: 250 };
    
    scanner.start({ facingMode: "environment" }, config, (text) => {
        document.getElementById('certId').value = text;
        manualVerify();
        scanner.stop();
    }).catch(err => {
        alert("Camera access denied or not available.");
    });
}
