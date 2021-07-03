import api from '../api.js'
import nationalities from '../nationalities.js'
import getServerInfo from '../serverinfo.js'

export default {
    name: 'serveradd',
    description: 'Add a new server spectator',
    async execute({client, message, args}) {
        if (!args || args.length < 4) {
            message.reply('Please provide a channel, name, IP address and country ISO code')
            return
        }

        const channelId = args[0]
        const channel = client.channels.cache.get(channelId)

        const name = args[1]
        const address = args[2]
        const countryKey = args[3]
        const description = args.length > 3 ? args[4] : undefined

        const countryFromKey = nationalities.getCountry(countryKey) || {}
        const country = `${countryFromKey.flag} ${countryFromKey.name}`

        try {
            const serverData = await api.fetchInfo(address)
            const embed = getServerInfo({description, name, address, country,...serverData})
            channel.send({embed})
        } catch (error) {
            message.reply('Something went wrong, sorry!')
            console.error(error)
        }
    }
}
