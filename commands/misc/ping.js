module.exports = {

    commands: 'miau',
    minArgs: 0,
    maxArg: 0,
    callback: (message, arguments, text) => {

        var palabras = ['Miau!', 'Miau!', 'Miau!', 'Miau!', 'Miau!',  'Los gatos no solo sabemos decir miau, Sabias ?','Que dijiste de mi madre!!']

        const palabrasfinal = palabras[Math.floor(Math.random() * palabras.length)]
        message.reply(palabrasfinal)
    },

}