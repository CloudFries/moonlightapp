const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'open',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      let openTickets = database.get(`opentickets_${message.guild.id}`)
      if(openTickets === null || 0){
        openTickets = 0
      }
      
      const embed = new MessageEmbed()
      .setTitle(`${message.guild.name} | Total Tickets'`)
      .setDescription(`There are currently **${openTickets} ticket(s) open!**`)
      .setThumbnail(message.guild.iconURL)
      .setColor("BLURPLE")
      .setFooter("Made by Cloud", "https://cdn.discordapp.com/avatars/290143878315507712/7d6d046b57434d346a7bddacea80e25e.webp")
      .setTimestamp()
      
      if(openTickets === 1) {
        return message.channel.send(embed.setDescription(`There is currently **${openTickets} open ticket!**`))
      }
      
      message.channel.send(embed)
    }
}