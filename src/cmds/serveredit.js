import nationalities from "../nationalities.js";

const FIELD_NAME_MAPPING = {
    "name": (embed, value) => embed.author = {name: value},
    "description": (embed, value) => embed.description = value,
    "location": (embed, value) => embed.fields.find(field => field.name === "Location:").value = value,
    "address": (embed, value) => {
        const ip = value.split(":")[0]
        const port = value.split(":")[1]
        embed.fields.find(field => field.name === "Address:").value = `:desktop: \`${value}\``
        embed.url = `https://acstuff.ru/s/q:race/online/join?ip=${ip}&httpPort=${port}`
    },
}

export default {
    name: 'serveredit',
    description: 'Edit a server overview',
    async execute({client, message, args}) {
        if (!args || args.length < 1) {
            message.reply("Please the IP address and port of the server overview that should be edited, as well as the name of the field and the value that should be set.")
            return
        }

        const channel = client.channels.cache.get(global.channel)

        const address = args[0]
        const fieldToBeEdited = args[1]
        let value = args.length > 2 ? args[2] : undefined

        if (fieldToBeEdited === "location") {
            const country = nationalities.getCountry(value)
            value = `${country.flag} ${country.name}`
        }

        const messages = await channel.messages.fetch({limit: 20})
        const messagesToBeEdited = messages
            .filter(msg => msg.author.id === global.botId)
            .filter(msg => !!msg.embeds && msg.embeds.length > 0)
            .filter(msg => msg.embeds[0].fields.find(field => field.name === "Address:").value.split("`")[1] === address)

        try {
            await Promise.all(messagesToBeEdited.map(async msg => {
                const newEmbed = Object.assign(msg.embeds[0])

                FIELD_NAME_MAPPING[fieldToBeEdited](newEmbed, value)
                newEmbed.timestamp = new Date()
                await msg.edit(newEmbed)
                message.reply("Successfully updated the " + fieldToBeEdited)
            }))
        } catch (e) {
            console.error(e)
            message.reply("An error occurred while trying to edit the messages")
        }
    }
}
