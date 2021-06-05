import api from '../api.js'
import nationalities from "../nationalities.js";
import getServerInfo from "../serverinfo.js"

export default {
    name: 'serveradd',
    description: 'Add a new server spectator',
    async execute({client, message, args}) {
        if (!args || args.length < 3) {
            message.reply("Please provide a name, IP address and country ISO code")
            return
        }

        const channel = client.channels.cache.get(global.channel)

        const name = args[0]
        const address = args[1]
        const countryKey = args[2]
        const description = args.length > 3 ? args[3] : undefined

        const countryFromKey = nationalities.getCountry(countryKey) || {}
        const country = `${countryFromKey.flag} ${countryFromKey.name}`

        try {
            const serverData = await api.fetchInfo(address)
            const embed = getServerInfo({description, name, address, country,...serverData})
            channel.send({embed})
        } catch (e) {
            message.reply("Something went wrong, sorry!")
            console.error(e)
        }
    }
}
