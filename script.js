async function checkStatus(url, statusId, pingId) {
    const statusElement = document.getElementById(statusId);
    const pingElement = document.getElementById(pingId);
    statusElement.textContent = "🔄 確認中...";
    statusElement.className = "status checking";

    try {
        const startTime = Date.now();
        const response = await fetch(url, { cache: "no-store" }); // キャッシュを無効化
        const endTime = Date.now();

        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status}`);
        }

        const json = await response.json();
        const serverTimestamp = json.timestamp || startTime;
        const pingTime = endTime - serverTimestamp;

        if (json.status === "maintenance") {
            statusElement.textContent = "🛠 メンテナンス";
            statusElement.className = "status maintenance";
            pingElement.style.display = "none"; // Pingを非表示
        } else if (json.status === "online") {
            statusElement.textContent = "✅ オンライン";
            statusElement.className = "status online";
            pingElement.style.display = "inline";
            pingElement.textContent = `${pingTime} ms`;
        } else {
            throw new Error("予期しないレスポンス");
        }
    } catch (error) {
        console.error(`エラー: ${error.message}`); // 🛑 エラーをログ出力
        statusElement.textContent = "❌ オフライン";
        statusElement.className = "status offline";
        pingElement.style.display = "none"; // Pingを非表示
    }

    updateAlertBox();
}

// お知らせ機能
function updateAlertBox() {
    const alertBox = document.getElementById("alert-box");
    const statuses = document.querySelectorAll(".status");
    let offlineOrMaintenance = [];

    statuses.forEach(status => {
        if (status.classList.contains("offline")) {
            offlineOrMaintenance.push(`${status.previousElementSibling.textContent} はオフラインです ❌`);
        } else if (status.classList.contains("maintenance")) {
            offlineOrMaintenance.push(`${status.previousElementSibling.textContent} はメンテナンス中 🛠`);
        }
    });

    if (offlineOrMaintenance.length > 0) {
        alertBox.innerHTML = offlineOrMaintenance.join("<br>");
        alertBox.style.display = "block";
    } else {
        alertBox.style.display = "none";
    }
}

// ✅ GlitchのURL & GitHub PagesのURL
const discordBot1 = "https://akane-quin.glitch.me/status";
const discordBot2 = "https://koharu-quin.glitch.me/status";
const githubPages = "https://aoikozu.github.io/akane/";

checkStatus(discordBot1, "discord-bot-status", "discord-bot-ping");
checkStatus(discordBot2, "discord-bot-status2", "discord-bot-ping2");
checkStatus(githubPages, "github-pages-status", "github-pages-ping");

// ⏳ 30秒ごとにステータスを更新
setInterval(() => {
    checkStatus(discordBot1, "discord-bot-status", "discord-bot-ping");
    checkStatus(discordBot2, "discord-bot-status2", "discord-bot-ping2");
    checkStatus(githubPages, "github-pages-status", "github-pages-ping");
}, 30000);
