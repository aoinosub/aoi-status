async function checkStatus(url, elementId) {
    const statusElement = document.getElementById(elementId);
    statusElement.classList.add("checking");

    try {
        const response = await fetch(url, { method: "HEAD", mode: "no-cors" });
        if (response.ok || response.status === 200) {
            statusElement.textContent = "オンライン";
            statusElement.classList.remove("checking", "offline");
            statusElement.classList.add("online");
        } else {
            throw new Error("オフライン");
        }
    } catch (error) {
        statusElement.textContent = "オフライン";
        statusElement.classList.remove("checking", "online");
        statusElement.classList.add("offline");
    }
}

// チェックするURL（あなたのDiscord BotとGitHub PagesのURLを入力）
const discordBotURL1 = "https://akane-quin.glitch.me";
const discordBotURL2 = "https://koharu-quin.glitch.me";
const githubPagesURL = "https://aoikozu.github.io/akane/";

checkStatus(discordBotURL1, "discord-bot-status1");
checkStatus(discordBotURL2, "discord-bot-status2");
checkStatus(githubPagesURL, "github-pages-status");

// 30秒ごとにステータスを更新
setInterval(() => {
    checkStatus(discordBotURL1, "discord-bot-status1");
    checkStatus(discordBotURL2, "discord-bot-status2");
    checkStatus(githubPagesURL, "github-pages-status");
}, 30000);
