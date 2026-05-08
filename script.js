const subjects = ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Data Science", "Python Programming", "Blockchain", "NLP", "Computer Vision", "Generative AI"];
const mainGrid = document.getElementById('mainGrid');

if (mainGrid) {
    subjects.forEach(s => {
        mainGrid.innerHTML += `<div class="card"><i class="fas fa-microchip" style="color:var(--gold); font-size:2rem; margin-bottom:15px;"></i><h3>${s}</h3><p>Advanced curriculum-based training.</p></div>`;
    });
}

const passes = { Admin: "santhassk", Staff: "SKAITECH2026", Student: "skaistudent" };
let currentPortal = "";

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
    if (input === passes[currentPortal]) {
        closeLogin();
        if (currentPortal === 'Admin') showAdmin();
        else alert("Access granted to " + currentPortal + " Dashboard.");
    } else {
        alert("Invalid Password.");
    }
}

function showAdmin() {
    document.getElementById('hero').innerHTML = `
        <div class="container" style="background:var(--royal-blue); padding:40px; border-radius:15px; border:1px solid var(--gold);">
            <h2 class="accent">Admin Dashboard</h2>
            <input type="text" id="sName" placeholder="Student Name">
            <input type="text" id="sID" placeholder="Certificate ID">
            <button class="portal-btn" style="margin-top:15px;" onclick="issue()">Issue Certificate</button>
            <button class="portal-btn" style="background:red; color:white; margin-top:15px;" onclick="location.reload()">Logout</button>
        </div>`;
}

function issue() {
    const n = document.getElementById('sName').value;
    const i = document.getElementById('sID').value;
    if (n && i) {
        const db = JSON.parse(localStorage.getItem('sk_db') || '{}');
        db[i] = { name: n, date: new Date().toLocaleDateString() };
        localStorage.setItem('sk_db', JSON.stringify(db));
        alert("Certificate issued!");
        document.getElementById('sName').value = "";
        document.getElementById('sID').value = "";
    }
}

function manualVerify() {
    const id = document.getElementById('certId').value.trim();
    const db = JSON.parse(localStorage.getItem('sk_db') || '{}');
    const res = document.getElementById('verifyResult');
    if (db[id]) {
        res.innerHTML = `<p style="color:#4ade80; margin-top:15px;">✅ Verified: ${db[id].name}</p>`;
    } else {
        res.innerHTML = `<p style="color:#ef4444; margin-top:15px;">❌ Not Found</p>`;
    }
}

function startScanner() {
    const scanner = new Html5Qrcode("reader");
    scanner.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, (text) => {
        document.getElementById('certId').value = text;
        manualVerify();
        scanner.stop();
    });
}
