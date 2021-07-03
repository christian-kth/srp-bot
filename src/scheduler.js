import api from './api.js'
import utils from './utils.js'
import leaderboard from './leaderboard.js'

const updateServerInfo = async (client) => {
    const messages = await utils.allMessagesFromChannelList(client)
    const filteredMessages = messages
        .filter(msg => !msg.embeds[0].author.name.startsWith('Leaderboard'))

    if (filteredMessages.length > 0) {
        await Promise.all(filteredMessages.map(async msg => {
            const embed = msg.embeds[0]
            const address = embed.fields.find(field => field.name === 'Address:').value.split('`')[1]

            try {
                const serverData = await api.fetchInfo(address)
                const newMessage = Object.assign(embed)
                newMessage.fields.find(field => field.name === 'Players:').value = `:video_game: ${serverData.currentPlayers || 0}/${serverData.maxPlayers || 0}`
                newMessage.fields.find(field => field.name === 'Status:').value = serverData.status
                newMessage.timestamp = new Date()
                await msg.edit(newMessage)
            } catch (error) {
                console.error('Something went wrong while trying to edit the server info message: ', error)
            }
        }))
        console.log('Finished updating server info for all servers.')
    }
}

const updateLeaderboards = async (client) => {
    const messages = await utils.allMessagesFromChannelList(client)
    const filteredMessages = messages
        .filter(msg => msg.embeds[0].author.name.startsWith('Leaderboard'))

    if (filteredMessages.length > 0) {
        await Promise.all(filteredMessages.map(async msg => {
            const embed = msg.embeds[0]
            const strackerUrl = embed.url
            const description = embed.description
            const name = embed.author.name

            try {
                const newMessage = await leaderboard(strackerUrl, description, name)
                await msg.edit(newMessage)
            } catch (error) {
                console.error('An error occurred while trying to update the leaderboard message', error)
            }
        }))
        console.log('Finished updating all leaderboards')
    }
}

export default {
    updateServerInfo,
    updateLeaderboards
}
