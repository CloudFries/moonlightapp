const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'lb',
    category: 'info',
    description: 'text here',
    run: async (bot, message, args) => {
        let data = await bot.db.getAll(`level-${message.guild.id}`);
        data = data.sort((a, b) => b.value.totalXp - a.value.totalXp);
        data = await Promise.all(data.map(async (data, index) => {
            const user = await bot.users.fetch(data.key.split("-")[2]).catch(() => null);
            if (user) {
                return {
                    user: user,
                    level: data.value.level,
                    xp: data.value.xp,
                    totalXp: data.value.totalXp,
                    rank: index + 1
                }
            }
        }));

        const errorEmbed = new MessageEmbed()
            .setTitle("Error!")
            .setDescription("There is no leaderboard for this server yet!")
            .setColor("RED")
            .setTimestamp()

        if (!data.length) return message.channel.send(errorEmbed)

        const page = bot.pages(data, 10, args[0] || 1)
        if (!page) return message.channel.send(errorEmbed.setDescription("That page does not exist!"));

        const embed = new MessageEmbed()
            .setAuthor(`Leaderboard | ${message.guild.name}`, message.guild.iconURL())
            .setColor("BLURPLE")
            .setDescription(page.map(e => `\`#${e.rank}\` ${e.user} **|** (**Level:** ${e.level}) **|** (**Current  XP:** ${e.xp}) **|** (**Total  XP:** ${e.totalXp})`))

        if (args[0] && isNaN(args[0])) {
            return message.channel.send(errorEmbed.setDescription("That is not a valid number!"))
        } else {

            message.channel.send(embed)
        }
    }
}