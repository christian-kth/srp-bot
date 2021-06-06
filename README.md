# srp-bot
Bot to fetch server status of AC game servers. Will update every 60 seconds

## Setting it up

To set it up, provide a `.env` file in the project root containing following values:

```
DISCORD_SECRET=<secret of your bot user>
ALLOWED_ROLES=<comma separated list of role IDs which will be able access the bots command>
CHANNEL=<channel ID that the bot posts and updates game server statuses in>
BOT_ID=<ID of your bot user>
```

Then start the bot via `node src/index.js`

## Commands

The bot listens to commands that start with the prefix `srpb!`. 
I was too lazy to cleanly extract the args so each parameter should be surrounded by `"`.

### Changing the channel

`srpb!channel "<channelId>"`

Changes the channel which the bot posts and updates game server statuses in

### Add permission

`srpb!permissionadd "<roleID>"`

Add a role to be able to access the bots commands

### Remove permission

`srpb!permissionremove <roleID>`

Remove a role from the list of roles that can access bot commands

### Add game server status

`srpb!serveradd "<name>" "<IP:port> "<two letter country code>" "<description>"`

Example:

`srpb!serveradd "My server" "95.211.222.135:11718" "nl" "Cool server everyone join :sunglasses:"`

will post this:

![image](https://i.imgur.com/dWFIFDq.png) 

### Edit game server status

`srpb!serveredit "<IP:port>" "<value name>" "<changed value>"`

Possible `value name`s:
* name
* address
* location
* description

Example:

`srpb!serveredit "95.211.222.135:11718" "name" "Changed name"`

will change the status from the example above to:

![image](https://i.imgur.com/NV2y4hh.png) 

### Remove a game server status

`srpb!serverdelete "<IP:port>"`

Removes game server status infos for the given IP:port
