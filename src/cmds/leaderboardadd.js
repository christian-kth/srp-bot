import leaderboard from '../leaderboard.js'

export default {
    name: 'leaderboardadd',
    description: 'Add a new stracker leaderboard watch',
    async execute({client, message, args}) {
        if (!args || args.length < 3) {
            message.reply('Please provide a name, description and URL')
            return
        }

        const channelId = args[0]
        const channel = client.channels.cache.get(channelId)

        const name = args[1]
        const description = args[2]
        const url = args[3]

        try {
            const embed = await leaderboard(url, description, name)
            channel.send({embed})
        } catch (error) {
            message.reply('Could not add that leaderboard boss man, sorry.')
            console.error(error)
        }
    }
}
