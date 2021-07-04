import Discord from 'discord.js'
import fetch from 'node-fetch'
import pkg from 'jsdom'
import utils from './utils.js'

const { JSDOM } = pkg

const CAR_NAME_MAPPING = {
    'ktyu_c8_lav_s1': 'C8 Laviolette Shuto Spec',
    'nissan_skyline_r34_omori_factory_s1': 'Skyline GT-R R34 Nismo Omori Factory S1',
    'srp_honda_s2000_legendary': 'S2000 (AP2 - Legendary)',
    'fgg_mitsubishi_evo_5_wangan': 'Lancer Evolution V Wangan Spec',
    'gmp_abflug_s900': 'ABflug S900 (JZA80)',
    'ddm_toyota_mr2_sw20_shuto': 'MR2 Shutoko-Spec',
    'ktyu_honda_nsx_ks': 'NSX Ktyu Spec',
    'nissan_skyline_r34_v-specperformance': 'Skyline GT-R R34 V-SPEC Performance',
    'amy_honda_ek9_turbo': 'Civic Type R (EK9) Turbo ver. 2',
    'ks_toyota_supra_mkiv_tuned': 'Supra MKIV Time Attack',
    'arch_ruf_ctr_1987': 'CTR-1 Yellowbird',
    'ddm_nissan_skyline_hr31_house': 'Skyline HR31 House-Spec',
    'srp_wangan_r33_ver1': 'Nissan Skyline GTR R33 (S3 - Wangan)',
}

export default async (strackerUrl, description, name) => {
    let htmlString
    if (description.startsWith('Monthly')) {
        const date = new Date().toISOString().slice(0, 8) + '01'
        strackerUrl = utils.replaceQueryParam(strackerUrl, 'date_from', date)
        strackerUrl = utils.replaceQueryParam(strackerUrl, 'date_to', '')
    }

    try {
        const response = await fetch(strackerUrl)
        if (response.status !== 200) {
            console.error("Website did not respond with status code OK")
            return unavailableMessage(description, strackerUrl)
        }

        htmlString = await response.text()
    } catch (error) {
        console.error('An error occurred while trying to get the stracker page', error)
        return unavailableMessage(description, strackerUrl)
    }

    let fields = parseStrackerHtml(htmlString).map((leaderboardEntry, index) => ({
        name: (index + 1) + '. ' + CAR_NAME_MAPPING[leaderboardEntry.vehicle] || leaderboardEntry.vehicle,
        value: leaderboardEntry.time + ' by ' + leaderboardEntry.player
    }))

    if (fields.length < 1) {
        fields = [{name: 'No times have been set so far!', value: 'Be the first one to set a time to be displayed here!'}]
    }

    return new Discord.MessageEmbed()
        .setColor('#c15f6e')
        .setTitle('Leaderboard Link')
        .setDescription(description)
        .setURL(strackerUrl)
        .setThumbnail('https://cdn.discordapp.com/attachments/671487944250490902/832189834700652604/newlogob.png')
        .setAuthor(name.startsWith('Leaderboard') ? name : 'Leaderboard: ' + name)
        .addFields(fields)
        .setTimestamp()
}

const unavailableMessage = (description, strackerUrl) => {
    return new Discord.MessageEmbed()
        .setColor('#c15f6e')
        .setTitle('Leaderboard Link')
        .setDescription(description)
        .setThumbnail('https://cdn.discordapp.com/attachments/671487944250490902/832189834700652604/newlogob.png')
        .setAuthor(name.startsWith('Leaderboard') ? name : 'Leaderboard: ' + name)
        .setURL(strackerUrl)
        .addField('Oh no', 'The leaderboard is currently unavailable. Try checking back again later')
        .setTimestamp()
}

// embrace pain
const parseStrackerHtml = (htmlString) => {
    const dom = new JSDOM(htmlString)
    return [...dom.window.document.querySelector('tbody').childNodes]
        .filter(node => node.nodeName === 'TR')
        .map(node => ({
            vehicle: node.children[2].innerHTML.trim(),
            player: node.children[1].innerHTML,
            time: node.children[3].innerHTML
        }))
}
