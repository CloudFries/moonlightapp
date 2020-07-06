const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'clearwarns',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You do not have permission to do that.");
      
      const errorEmbed = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("Please mention a user or provide an ID!")
      .setColor("RED")
      .setTimestamp()
      
      const errorEmbed2 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("A bot cannot have any warnings!")
      .setColor("RED")
      .setTimestamp()
      
      const errorEmbed4 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("That is not a valid member!")
      .setColor("RED")
      .setTimestamp()
      
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if(!user) return message.channel.send(errorEmbed4)
      
      if(user.bot) return message.channel.send(errorEmbed2)
      
      let warnings = database.get(`warnings_${message.guild.id}_${user.id}`)
      
      const errorEmbed3 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription('This user does not have any warnings!')
      .setColor("BLURPLE")
      .setTimestamp()
      
      const resetEmbed = new MessageEmbed()
      .setTitle("Success!")
      .setDescription(`I have set ${user}'s warnings to 0`)
      .setColor("BLURPLE")
      .setTimestamp()
      
      if (warnings === null || 0) return message.channel.send(errorEmbed3)
      
      database.delete(`warnings_${message.guild.id}_${user.id}`)
      
      message.channel.send(resetEmbed);
    }
}