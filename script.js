async function checkStatus(url, serviceKey, statusId, pingId) {
    const statusElement = document.getElementById(statusId);
    const pingElement = document.getElementById(pingId);
    const savedStatus = localStorage.getItem(serviceKey);

    if (savedStatus && savedStatus !== "auto") {
        statusElement.textContent = formatStatus(savedStatus);
        statusElement.className = "status " + savedStatus;
        pingElement.style.display = savedStatus === "online" ? "inline" : "none";
        return;
    }

    try {
        const startTime = Date.now();
        const response = await fetch(url);
        const endTime = Date.now();

        if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
        const json = await response.json();
        const pingTime = endTime - (json.timestamp || startTime);

        if (json.status === "maintenance") {
            statusElement.textContent = "🛠 メンテナンス";
            statusElement.className = "status maintenance";
            pingElement.style.display = "none";
        } else {
            statusElement.textContent = "✅ オンライン";
            statusElement.className = "status online";
            pingElement.style.display = "inline";
            pingElement.textContent = `${pingTime} ms`;
        }
    } catch {
        statusElement.textContent = "❌ オフライン";
        statusElement.className = "status offline";
        pingElement.style.display = "none";
    }
}

function saveStatus() {
    ["akane", "koharu", "website"].forEach(service => {
        const value = document.getElementById(`${service}-control`).value;
        localStorage.setItem(service, value);
    });
}

function formatStatus(status) {
    return status === "online" ? "✅ オンライン" : status === "maintenance" ? "🛠 メンテナンス" : "❌ オフライン";
}

setInterval(() => {
    checkStatus("https://akane-quin.glitch.me/status", "akane", "akane-status", "akane-ping");
    checkStatus("https://koharu-quin.glitch.me/status", "koharu", "koharu-status", "koharu-ping");
}, 30000);
