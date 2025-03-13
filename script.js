async function checkStatus(url, statusElementId, pingElementId) {
    const statusElement = document.getElementById(statusElementId);
    const pingElement = document.getElementById(pingElementId);
    statusElement.classList.add("checking");

    try {
        const startTime = Date.now();
        const response = await fetch(url, { method: "HEAD", mode: "no-cors" });
        const pingTime = Date.now() - startTime; // Ping時間を計算

        if (response.ok || response.status === 200) {
            statusElement.textContent = "オンライン";
            statusElement.classList.remove("checking", "offline", "maintenance");
            statusElement.classList.add("online");
            pingElement.textContent = `Ping: ${pingTime} ms`;
        } else {
            throw new Error("オフライン");
        }
    } catch (error) {
        if (error.message === "メンテナンス中") {
            statusElement.textContent = "メンテナンス中";
            statusElement.classList.remove("checking", "online", "offline");
            statusElement.classList.add("maintenance");
        } else {
            statusElement.textContent = "オフライン";
            statusElement.classList.remove("checking", "online", "maintenance");
            statusElement.classList.add("offline");
        }
        pingElement.textContent = "Ping: - ms";
    }
}

// チェックするURL（あなたのDiscord BotとGitHub PagesのURLを入力）
const discordBotURL1 = "https://akane-quin.glitch.me";
const discordBotURL2 = "https://koharu-quin.glitch.me";
const githubPagesURL = "https://aoikozu.github.io/akane/";

checkStatus(discordBotURL1, "discord-bot-status", "discord-bot-ping");
checkStatus(discordBotURL2, "discord-bot-status2", "discord-bot-ping2");
checkStatus(githubPagesURL, "github-pages-status", "github-pages-ping");

// 30秒ごとにステータスを更新
setInterval(() => {
    checkStatus(discordBotURL1, "discord-bot-status", "discord-bot-ping");
    checkStatus(discordBotURL2, "discord-bot-status2", "discord-bot-ping2");
    checkStatus(githubPagesURL, "github-pages-status", "github-pages-ping");
}, 30000);
