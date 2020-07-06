const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'tickets',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      let tickets = database.get(`ticketAmt_${message.guild.id}`)
      
      if(tickets === null || 0) {
        tickets = 0
      }
      
      const embed = new MessageEmbed()
      .setTitle(`${message.guild.name} | Total Tickets'`)
      .setDescription(`There are currently **${tickets} total ticket(s)!**`)
      .setThumbnail(message.guild.iconURL)
      .setColor("BLURPLE")
      .setFooter("Made by Cloud", "https://cdn.discordapp.com/avatars/290143878315507712/7d6d046b57434d346a7bddacea80e25e.webp")
      .setTimestamp()
      
      if(tickets === 1) {
        return message.channel.send(embed.setDescription(`There is currently **${tickets} total ticket!**`))
      }
      
      message.channel.send(embed)
    }
}