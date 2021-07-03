export default {
    name: 'channeladd',
    description: 'Adds a channel in which the bot can post and watches',
    execute({client, message, args}) {
        if (!args || args.length < 1) {
            message.reply('Please provide a channel ID')
            return
        }
        const selectedChannelId = args[0]
        const channelName = client.channels.cache.get(selectedChannelId)?.name

        if (channelName) {
            global.channels = [...global.channels, selectedChannelId]
            message.reply('Successfully added channel ' + channelName + 'to the list of watchable channels')
        } else {
            message.reply('Could not find that channel boss man, sorry.')
        }
    }
}
