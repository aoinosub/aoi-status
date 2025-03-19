const PASSWORD = "3012";  // 🔐 管理ページのパスワード

function saveStatus() {
    const status = {
        akane: document.getElementById("akane-control").value,
        koharu: document.getElementById("koharu-control").value,
        website: document.getElementById("website-control").value
    };
    localStorage.setItem("serviceStatus", JSON.stringify(status));
    alert("ステータスが保存されました！");
}

function loadStatus() {
    const status = JSON.parse(localStorage.getItem("serviceStatus")) || {
        akane: "online",
        koharu: "online",
        website: "online"
    };

    document.getElementById("akane-status").textContent = formatStatus(status.akane);
    document.getElementById("akane-status").className = "status " + status.akane;
    document.getElementById("koharu-status").textContent = formatStatus(status.koharu);
    document.getElementById("koharu-status").className = "status " + status.koharu;
    document.getElementById("website-status").textContent = formatStatus(status.website);
    document.getElementById("website-status").className = "status " + status.website;
}

function formatStatus(status) {
    return status === "online" ? "✅ オンライン" :
           status === "maintenance" ? "🛠 メンテナンス" : "❌ オフライン";
}

function checkPassword() {
    const input = document.getElementById("password").value;
    if (input === PASSWORD) {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("admin-panel").style.display = "block";
    } else {
        alert("パスワードが違います！");
    }
}

if (document.getElementById("admin-panel")) {
    const status = JSON.parse(localStorage.getItem("serviceStatus")) || {};
    document.getElementById("akane-control").value = status.akane || "online";
    document.getElementById("koharu-control").value = status.koharu || "online";
    document.getElementById("website-control").value = status.website || "online";
}

if (document.getElementById("status-container")) {
    loadStatus();
}
