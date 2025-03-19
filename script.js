async function checkStatus(url, statusId, pingId) {
    const statusElement = document.getElementById(statusId);
    const pingElement = document.getElementById(pingId);
    statusElement.textContent = "🔄 確認中...";
    statusElement.className = "status checking";

    try {
        const startTime = Date.now();
        const response = await fetch(url);
        const endTime = Date.now();

        if (response.ok) {
            const json = await response.json();
            const serverTimestamp = json.timestamp || startTime;
            const pingTime = endTime - serverTimestamp;

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

const discordBot1 = "https://akane-quin.glitch.me/status";
const discordBot2 = "https://koharu-quin.glitch.me/status";
const githubPages = "https://aoikozu.github.io/akane/";

checkStatus(discordBot1, "discord-bot-status", "discord-bot-ping");
checkStatus(discordBot2, "discord-bot-status2", "discord-bot-ping2");
checkStatus(githubPages, "github-pages-status", "github-pages-ping");

setInterval(() => {
    checkStatus(discordBot1, "discord-bot-status", "discord-bot-ping");
    checkStatus(discordBot2, "discord-bot-status2", "discord-bot-ping2");
    checkStatus(githubPages, "github-pages-status", "github-pages-ping");
}, 30000);
