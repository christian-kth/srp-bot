# srp-bot
Bot to fetch server status of AC game servers and display stracker leaderboards. 

Will update server info every minute and leaderboards every five minutes

## Setting it up

To set it up, provide a `.env` file in the project root containing following values:

```
DISCORD_SECRET=<secret of your bot user>
ALLOWED_ROLES=<comma separated list of role IDs which will be able access the bots command>
CHANNELS=<comma separated list of channel IDs that the bot can post and watch messages in>
BOT_ID=<ID of your bot user>
```

Then start the bot via `node src/index.js`

## Commands

The bot listens to commands that start with the prefix `srpb!`. 
I was too lazy to cleanly extract the args so each parameter should be surrounded by `"`.

### Adding a channel

`srpb!channeladd "<channelID>"`

Adds a channel to the list that the bot watches his own server status/leaderboard posts in

### Removing a channel

`srpb!channelremove "<channelID>"`

Removes a channel from the list that the bot watches his own server status/leaderboard posts in

### Add permission

`srpb!permissionadd "<roleID>"`

Add a role to be able to access the bots commands

### Remove permission

`srpb!permissionremove <roleID>`

Remove a role from the list of roles that can access bot commands

### Add game server status

`srpb!serveradd "<channelID>" "<name>" "<IP:port> "<two letter country code>" "<description>"`

Example:

`srpb!serveradd "666760533411758135" "My server" "95.211.222.135:11718" "nl" "Cool server everyone join :sunglasses:"`

will post this in the channel with ID = 666760533411758135:

![image](https://i.imgur.com/dWFIFDq.png) 

### Edit game server status

`srpb!serveredit "<channelID>" "<IP:port>" "<value name>" "<changed value>"`

Possible `value name`s:
* name
* address
* location
* description

Example:

`srpb!serveredit "666760533411758135" "95.211.222.135:11718" "name" "Changed name"`

will change the status in channel with ID = 666760533411758135 from the example above to:

![image](https://i.imgur.com/NV2y4hh.png) 

### Add game server status

`srpb!leaderboardadd "<channelID>" "<name>" "<description> "<strackerUrl>"`

Example:

`srpb!leaderboardadd "666760533411758135" "C1 Time Attack" "Cool leaderboard!" "http://54.37.245.203:54301/lapstat<queryParams>"`

will post something along the lines of this in the channel with ID = 666760533411758135:

![image](https://i.imgur.com/unvuMyP.png) 

**NOTE:** Starting the description with "Monthly" will add params to the strackerUrl that will only display results for the
current month.