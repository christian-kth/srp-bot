import * as dotenv from 'dotenv'
import Discord from 'discord.js'
import * as fs from "fs";
import scheduler from "./scheduler.js";

dotenv.config()

global.scheduleDelay = 60000
global.botId = String(process.env.BOT_ID)
global.permittedRoles = String(process.env.ALLOWED_ROLES).split(",")
global.channel = String(process.env.CHANNEL)

const client = new Discord.Client()
await client.login(process.env.DISCORD_SECRET)

client.on("ready", () => console.log("Connected"))

const commands = {}
const commandFiles = fs.readdirSync('src/cmds').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    try {
        const module = await import(`./cmds/${file}`)
        const command = module.default
        commands[command.name] = command.execute
    } catch (e) {
        console.error(e)
    }
}

client.on("message", message => {
    if (!message.content.startsWith("srpb!") || !message.member.roles.cache.some(role => global.permittedRoles.includes(role.id))) {
        return
    }

    const command = message.content.substr(5).split(" ")[0]
    const unfilteredArgs = message.content.split(" ")
    unfilteredArgs.shift()

    const args = unfilteredArgs.join(" ").split("\"").filter(str => !!str && str.replace(" ", "").length > 0)

    try {
        commands[command]({client, message, args})
    } catch (error) {
        console.error("Something went wrong!", error)
    }
})

const scheduleUpdates = () => setTimeout(async () => {
    await scheduler.updateMessages(client)
    scheduleUpdates()
}, global.scheduleDelay)

scheduleUpdates()
