const { Client, Message, Role } = require('discord.js')
const { format } = require('path/posix')
const { prefix } = require('../config.json')

const validatePermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS_AND_STICKERS',
        'USE_APPLICATION_COMMANDS',
        'REQUEST_TO_SPEAK',
        'MANAGE_EVENTS',
        'MANAGE_THREADS',
        'CREATE_PUBLIC_THREADS',
        'CREATE_PRIVATE_THREADS',
        'USE_EXTERNAL_STICKERS',
        'SEND_MESSAGES_IN_THREADS',
        'START_EMBEDDED_ACTIVITIES'
    ]
    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            console.log("\n Prueba error")

            throw new Error(`Permiso desconocido node "${permission}"`)

        }
    }
}

const allCommands = {}

module.exports = (commandOptions) => {

    let {

        commands,
        permissions = [],

    } = commandOptions

    //se asegura que el comando y el alias esta en el array
    if (typeof commands === 'string') {
        commands = [commands]
    }

    console.log(`Cargado el comando "${commands[0]}"`)

    //se asegura que los permisos esten en el array 

    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }
        validatePermissions(permissions)
    }
    for (const command of commands) {
        allCommands[command] = {
            ...commandOptions,
            commands,
            permissions
        };
    }
}

module.exports.listen = (client) => {

    //escuchar mensajes
    client.on('message', message => {
        const { member, content, guild } = message;

        //dividir en una cantidad de espacios 
        const arguments = content.split(/[ ]+/)
        //remover el comando con el primer index 
        const name = arguments.shift().toLowerCase();

        if (name.startsWith(prefix)) {
            const command = allCommands[name.replace(prefix, '')]
            if (!command) {
                return;
            }  

            const {
                permissions,
                permissionError = 'No tienes permisos para este comando.',
                requiredRoles = [],
                minArgs = 0,
                maxArg = null,
                expectedArgs,
                callback
            } = command



            for (const permission of permissions) {
                if (!member.hasPermission(permission)) {
                    message.reply(permissionError)
                    return
                }
            }
            /*nos aseguramos que el usuarioque ejecuta el comando tenga los 
            permisos necesarios*/
            for (const requiredRole of requiredRoles) {

                const role = guild.role.cache.find(role =>
                    role.name === requiredRole)

                if (!role || !member.role.cache.hasPermissions(role.id)) {
                    message.reply(`Debes tener permisos de "${requiredRole}"
                 para usar el comando`)
                    return
                }
            }


            //Asegurarnos que tenemos el nuemro correcto de argumentos 
            if (arguments.length < minArgs || (maxArg !== null &&
                arguments.length > maxArg)) {
                message.reply(`sintaxis incorrecta! usa ${prefix}${alias} ${expectedArgs}`
                );
                return;

            }
            callback(message, arguments, arguments.join(''))

        }
    })

}