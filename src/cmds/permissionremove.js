export default {
    name: 'permissionremove',
    description: 'Remove a role that should not be able to use the bot anymore',
    execute({message, args}) {
        if (!args || args.length < 1) {
            message.reply('Please provide a role ID')
            return
        }

        const selectedRole = args[0]
        global.permittedRoles = global.permittedRoles.filter(role => role !== selectedRole)
        message.reply('Successfully removed role ' + selectedRole + ' to not be able to use the bot anymore.')
    }
}
