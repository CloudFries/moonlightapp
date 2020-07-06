//command updated with additional features by NutSoGreat
const { MessageEmbed } = require('discord.js');
const database = require('quick.db')

module.exports = {
    name: 'apply',
    category: 'info',
    description: 'text here',
    run: async (bot, message, args) => {
        //Get server questions, create deafult value if none are found
        const questions = bot.ensure(`${message.guild.id}_questions`, [])
        const appchannel = database.get(`${message.guild.id}_appchannel`)
        const answers = []
        const filter = m => m.author.id === message.author.id

        //If there is no channel found to send applications, or there are no questions, return
        if (!appchannel || !message.guild.channels.cache.get(appchannel)) return message.channel.send('The application channel hasnt been setup or is missing on this server\nSet it using `application channel #channel`')
        if (!questions.length) return message.channel.send('Applications havent been setup on this server\n create questions using `application add <question>`')

        for (var i in questions) { //Loop throug            question
            message.channel.send(`${i + 1}) ${questions[i]}`)
            const a = (await message.channel.awaitMessages(filter, { max: 1, time: 30000 })); //max of 30 seconds per question

            if (a.first()) answers.push(a.first().content.slice(0, 500) + '...') //Add ... if longer than 500 characters
            else return message.channel.send('Out of time! Application cancelled') //Cancel command if no response
        }

        //Store all the answers given by the user
        let description = answers.map((a, i) => `${i + 1}) ${a}`).join('\n')
        let pages = Math.ceil(description.length / 2000)
        const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`Application from user ${message.author.tag}`)

        if (pages < 1) return appchannel.send(embed.setDescription(description)).catch(console.error)

        //Let user know that the app has been split
        embed.setFooter('Application split, max characters exceeded')

        //If the application response is more than 2k characters, split the message
        for (var i = 0; i < pages; i++)
            message.channel.send(embed.setDescription(description.slice(i * 10, i * 10 + 10))).catch(console.error)
    }
}


