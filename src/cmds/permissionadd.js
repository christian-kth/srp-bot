export default {
    name: 'permissionadd',
    description: 'Add a role that can use the bot',
    execute({message, args}) {
        if (!args || args.length < 1) {
            message.reply("Please provide a role ID")
            return
        }

        const selectedRole = args[0]
        global.permittedRoles = [...global.permittedRoles.filter(r => r !== selectedRole), selectedRole]
        message.reply("Successfully added role " + selectedRole + " to be able to use the bot.")
    }
}
