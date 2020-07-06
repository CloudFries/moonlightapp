const {MessageEmbed} = require('discord.js');
const database = require('quick.db')
module.exports={
    name: 'help',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      const errorEmbed = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("That is not a valid help category!")
      .setColor("RED")
      .setTimestamp()
      
      let prefix = database.get(`prefix_${message.guild.id}`)
      if (prefix === null || 0) prefix = "c!"  
      
      const helpEmbed = new MessageEmbed()
      .setTitle("Cloud Bot | Help Menu")
      .setThumbnail(bot.user.displayAvatarURL())
      .setDescription(`My prefix here is **${prefix}**`)
      .addField("help mod", "Moderation commands for Cloud bot")
      .addField("help tickets", "Ticket commands for Cloud bot")
      .setColor("PURPLE")
      .setFooter("Made by Cloud", "https://cdn.discordapp.com/avatars/290143878315507712/7d6d046b57434d346a7bddacea80e25e.webp")
      .setTimestamp()
      
      const ticketEmbed = new MessageEmbed()
      .setTitle("Ticket commands for Cloud bot")
      .setThumbnail(bot.user.displayAvatarURL())
      .setColor("BLUE")
      .setFooter("Made by Cloud", "https://cdn.discordapp.com/avatars/290143878315507712/7d6d046b57434d346a7bddacea80e25e.webp")
      .setTimestamp()
      .setDescription("`new` - Create a new ticket\n`close` - Close a ticket\n`tickets` - Shows the total amount of tickets ever made in your server\n`open` - Shows how many tickets are currently open in the server")
      
      const modEmbed = new MessageEmbed()
      .setTitle("Moderation commands for Cloud bot")
      .setThumbnail(bot.user.displayAvatarURL())
      .setColor("RED")
      .setFooter("Made by Cloud", "https://cdn.discordapp.com/avatars/290143878315507712/7d6d046b57434d346a7bddacea80e25e.webp")
      .setTimestamp()
      .setDescription("`ban` - Ban a member by mentioning them or using their ID\n`kick` - Kick a user\n`clear` - Purge messages in chat\n`mute` - Permanately mute a user\n`unmute` - Unmute a user")
      
      if(args[0] === "tickets") {
        message.channel.send(ticketEmbed)
      }
      
      if(args[0] === "mod") {
        message.channel.send(modEmbed)
      } 
      
                  if(!args[0]) {
      message.channel.send(helpEmbed)
      } else {
        if(args[0] === "mod") return;
        if(args[0] === "tickets") return;
        message.channel.send(errorEmbed)
      }
      
    }
}