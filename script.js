async function checkStatus(url, statusElementId, pingElementId) {
    const statusElement = document.getElementById(statusElementId);
    const pingElement = document.getElementById(pingElementId);
    statusElement.textContent = "🔄 確認中...";
    statusElement.className = "status checking";

    try {
        const startTime = Date.now();
        const response = await fetch(url);
        const pingTime = Date.now() - startTime; // Ping時間を計測

        if (response.ok) {
            const json = await response.json();
            if (json.status === "maintenance") {
                statusElement.textContent = "🛠 メンテナンス中";
                statusElement.className = "status maintenance";
                pingElement.textContent = "⏳ メンテナンス中";
            } else {
                statusElement.textContent = "✅ オンライン";
                statusElement.className = "status online";
                pingElement.textContent = `⚡ Ping: ${pingTime} ms`;
            }
        } else {
            throw new Error("オフライン");
        }
    } catch (error) {
        statusElement.textContent = "❌ オフライン";
        statusElement.className = "status offline";
        pingElement.textContent = "Ping: - ms";
    }
}

// ✅ Discord Bot & GitHub Pages の URL
const discordBotURL1 = "https://akane-quin.glitch.me/status";
const discordBotURL2 = "https://koharu-quin.glitch.me/status";
const githubPagesURL = "https://aoikozu.github.io/akane/";

checkStatus(discordBotURL1, "discord-bot-status", "discord-bot-ping");
checkStatus(discordBotURL2, "discord-bot-status2", "discord-bot-ping2");
checkStatus(githubPagesURL, "github-pages-status", "github-pages-ping");

// ⏳ 30秒ごとにステータスを更新
setInterval(() => {
    checkStatus(discordBotURL1, "discord-bot-status", "discord-bot-ping");
    checkStatus(discordBotURL2, "discord-bot-status2", "discord-bot-ping2");
    checkStatus(githubPagesURL, "github-pages-status", "github-pages-ping");
}, 30000);
