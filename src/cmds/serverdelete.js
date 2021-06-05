export default {
    name: 'serverdelete',
    description: 'Remove a posted server overview',
    async execute({client, message, args}) {
        if (!args || args.length < 1) {
            message.reply("Please the IP address and port of the server overview that should be deleted")
            return
        }

        const channel = client.channels.cache.get(global.channel)

        const addressToBeDeleted = args[0]

        const messages = await channel.messages.fetch({limit: 20})
        const messagesToBeDeleted = messages
            .filter(msg => msg.author.id === global.botId)
            .filter(msg => !!msg.embeds && msg.embeds.length > 0)
            .filter(msg => msg.embeds[0].fields.find(field => field.name === "Address:").value.split("`")[1] === addressToBeDeleted)

        try {
            await Promise.all(messagesToBeDeleted.map(msg => msg.delete()))
        } catch (e) {
            console.error(e)
            message.reply("An error occurred while trying to delete the messages")
        }
    }
}