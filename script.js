async function checkStatus(url, statusElementId, pingElementId) {
    const statusElement = document.getElementById(statusElementId);
    const pingElement = document.getElementById(pingElementId);
    statusElement.textContent = "🔄 確認中...";
    statusElement.className = "status checking";

    try {
        const startTime = Date.now();
        const response = await fetch(url);
        const endTime = Date.now();

        if (response.ok) {
            const json = await response.json();
            const serverTimestamp = json.timestamp || startTime; // サーバーの応答時間
            const pingTime = endTime - serverTimestamp; // Pingを計算

            if (json.status === "maintenance") {
                statusElement.textContent = "🛠 メンテナンス";
                statusElement.className = "status maintenance";
                pingElement.textContent = "- ms";
            } else {
                statusElement.textContent = "✅ オンライン";
                statusElement.className = "status online";
                pingElement.textContent = `${pingTime} ms`;
            }
        } else {
            throw new Error("オフライン");
        }
    } catch (error) {
        statusElement.textContent = "❌ オフライン";
        statusElement.className = "status offline";
        pingElement.textContent = "- ms";
    }
}

// ✅ GlitchのURL & GitHub PagesのURL
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
