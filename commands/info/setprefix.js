const {MessageEmbed} = require('discord.js');
const database = require('quick.db')
module.exports={
    name: 'setprefix',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      const errorEmbed = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("Only admins can use this command!")
      .setColor("RED")
      .setTimestamp()
      
      const embed = new MessageEmbed()
      .setTitle("Success!")
      .setDescription(`I have set the prefix to **${args[0]}**`)
      .setColor("GREEN")
      .setThumbnail(message.guild.iconURL)
      .setFooter(message.guild.name)
      .setTimestamp()
      
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(errorEmbed)
      database.set(`prefix_${message.guild.id}`, args[0])
      message.channel.send(embed)
      
    }
}