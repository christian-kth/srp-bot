import fetch from 'node-fetch'

const OFFLINE_RESPONSE = {
    status: ":red_circle: Offline",
    currentPlayers: 0,
    maxPlayers: 0
}

const fetchInfo = async (address) => {

    try {
        const response = await fetch(`http://${address}/INFO`, {"Content-Type": "application/json"})
        const json = response.status === 200 ? await response.json() : {failed: true}

        return json.failed ? OFFLINE_RESPONSE : {
            status: ":green_circle: Online",
            currentPlayers: json.clients,
            maxPlayers: json.maxclients,
        }
    } catch (e) {
        return OFFLINE_RESPONSE
    }
}

export default {
    fetchInfo
}
