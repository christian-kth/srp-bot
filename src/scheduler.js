import api from './api.js'

const updateMessages = async (client) => {
    const channel = client.channels.cache.get(global.channel)

    const messages = await channel.messages.fetch({limit: 20})
    const filteredMessages = messages.filter(msg => msg.author.id === global.botId)

    try {
        await Promise.all(filteredMessages.map(async msg => {
            const embed = msg.embeds[0];
            const address = embed.fields.find(field => field.name === "Address:").value.split("`")[1]

            try {
                const serverData = await api.fetchInfo(address)
                const newMessage = Object.assign(embed)
                newMessage.fields.find(field => field.name === "Players:").value = `:video_game: ${serverData.currentPlayers || 0}/${serverData.maxPlayers || 0}`
                newMessage.fields.find(field => field.name === "Status:").value = serverData.status
                newMessage.timestamp = new Date()
                await msg.edit(newMessage)
            } catch (e) {
                console.error(e)
            }
        }))
    } finally {
        console.log("Successfully updated all servers")
    }
}

export default {
    updateMessages
}
