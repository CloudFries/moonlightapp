//command updated with additional features by NutSoGreat
const { MessageEmbed } = require('discord.js');
const database = require('quick.db')
const _ = require('lodash') //Download this npm package if you havent already

module.exports = {
    name: 'application',
    category: 'info',
    description: 'text here',
    run: async (bot, message, args) => {
        //Check member permissions, and arguments
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You dont have permissions to use this command')
        if (!args[0] || !['add', 'remove', 'list', 'clear', 'channel'].includes(args[0])) return message.channel.send('Invalid syntax, please do `application <add | remove | list | clear | channel> [question | #channel]`')

        //Get guild questions, set default value if doesnt exist
        let questions = database.get(`${message.guild.id}_questions`, [])

        //This section adds a question to the total
        if (args[0] == 'add') {
            if (!args[1] || args[1].length > 500) return message.channel.send('Input a question to add to the application that is less than 500 characters!')
            questions.push(args[1]) //Add question to end of array
            database.set(`${message.guild.id}_questions`, questions) //Save data
            return message.channel.send(`Question set as question #${questions.length}`)
        }

        //Remove a question if given the question number
        else if (args[0] == 'remove') {
            if (!questions.length) return message.channel.send('There arent any questions to remove!')
            if (!args[1] || isNaN(args[1]) || args[1] > questions.length || args[1] < 1) return message.channel.send(`Please choose which question number to remove. Theres ${questions.length} total questions`)
            questions.splice(args[1] - 1, 1) //This will remove the question from the list
            database.set(`${message.guild.id}_questions`, questions) //Save the data
            return message.channel.send(`Successfully removed question #${args[1]}`) //Return a message
        }

        //List all questions with reaction menu if theres more than 10
        else if (args[0] == 'list') {
            if (!questions.length) return message.channel.send('There are no questions to list!')

            let chunks = _.chunk(questions, 10), max = chunks.length, page = 1
            const embed = new MessageEmbed()
                .setTitle('List of current application questions:')
                .setDescription(chunks[0].map((q, i) => `${i}) ${q}\n`))
                .setColor("GREEN")

            return message.channel.send(embed).then(async e => {
                e.react('◀️').then(e.react('▶️'))
                const filter = (reaction, user) => user.id === message.author.id
                const collector = e.createReactionCollector(filter, { time: 300000 })

                collector.on('collect', r => {
                    if (r.emoji.name === '◀️' && page != 1) page--
                    else if (r.emoji.name === '▶️' && page != max) page++
                    e.edit(chunks[page - 1].map((q, i) => `${i}) ${q}\n`))
                })
            })
        }

        //Clears the application list
        else if (args[0] == 'clear') {
            if (!questions.length) return message.channel.send('There arent any questions to remove!')
            database.set(`${message.guild.id}_questions`, [])
            message.channel.send('Cleared all questions')
        }

        //Sets the channel to end applications to
        else {
            if (!message.mentions.channels.first()) return message.channel.send('Please mention a channel to send applications to.')
            database.set(`${message.guild.id}_appchannel`, message.mentions.channels.first().id)
        }
    }
}