export default {
    name: 'channel',
    description: 'Changes the channel in which the bot posts and watches',
    execute({client, message, args}) {
        if (!args || args.length < 1) {
            message.reply("Please provide a channel ID")
            return
        }
        const selectedChannelId = args[0]
        const channelName = client.channels.cache.get(selectedChannelId)?.name

        if (channelName) {
            global.channel = selectedChannelId
            message.reply("Successfully changed channel to " + channelName)
        } else {
            message.reply("Oof, that didn't work.")
        }
    }
}
