const Discord = require("discord.js")
const client = new Discord.Client()

module.exports = {
    commands: 'rol',
    expectedArgs: "<Target user's @> <The role name>",
    permissionError:'Necesitas permisos de administrador para este comando',
    minArgs: 2,
    permissions: 'ADMINISTRATOR',
    callback: (message, arguments) => {

        const targetUsers = message.mentions.users.first()

        if (!targetUsers) {
            message.reply('Por favor especifica alguien a quien asignar este rol.')
            return
        }

        arguments.shift()
        const roleName = arguments.join(' ')
        const { guild } = message

        const role = guild.roles.cache.find((role) => {

            return role.name === roleName

        })
        if (!role) {
            message.reply(`No existe un rol con el nombre"${roleName}"`)
            return
        }

        const member = guild.members.cache.get(targetUsers.id)
        member.roles.add(role)
        message.reply(`Ese usuario ahora tiene el rol de ${roleName}`)

        const embed = new Discord.MessageEmbed()

        if (roleName === 'Esclavos verificados') {
            member.send({
                embed: {

                    author: {
                        name: ('Guatequebot'),
                    },
                    color: 3447003,

                    title: "**Felicidades por tu nueva beca!!!**",

                    description: "Te damos la bienvenida a los Esclavos de aza. Espero que logres aprender mucho y llegues algun día a tener tu propio equipo.",
                    fields: [{
                        name: "__Comencemos por el primer paso__",
                        value: "Te recomiendo que entres a [📚condiciones-y-guia-rapida](https://discord.com/channels/899399705593806928/900092044440113164/910718290794541166). Aqui aprenderas los conceptos basicos que necesitas saber y a crearte tu cuenta de ronin."
                    },


                    {
                        name: "__Informacion muy util__",
                        value: "Tambien puedes ver todas las cartas en [🃏cartas-en-español](https://discord.com/channels/899399705593806928/899705114481266730/906347433477410846). Es importante que sigas correctamente las instrucciones para poder verlas bien."
                    },
                    {
                        name: "__Guia de campeones__",
                        value: "Ademas tenemos una  [🥈guia-pvp-basica](https://discord.com/channels/899399705593806928/900092217597775902/906346445148413982).Y prontamente vamos a hacer una guia avanzada para que aumentes tus conocimientos en el juego.\n\n **__No olvides mandarle a Aza tu direccion de Ronnin una vez la termines de crear.__**",
                    },


                    ],
                    timestamp: new Date(),


                }
            });

        }
    }

}


