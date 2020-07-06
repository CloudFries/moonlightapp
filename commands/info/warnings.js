const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'warnings',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      const errorEmbed = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("Invalid Formatting!")
      .setColor("RED")
      .setTimestamp()
      
      const errorEmbed2 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("That is not a valid member!")
      .setColor("RED")
      .setTimestamp()
      
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!user) return message.channel.send(errorEmbed2)
      if(args[1]) return message.reply(errorEmbed)
      
      let warnings = database.get(`warnings_${message.guild.id}_${user.id}`)
      if(warnings === null || 0) warnings = 0;
      
      const warningsEmbed = new MessageEmbed()
      .setTitle("Warnings")
      .setDescription(`${user} has **${warnings} warnings**`)
      .setColor("BLURPLE")
      .setTimestamp()
      
      message.channel.send(warningsEmbed)
    }
}