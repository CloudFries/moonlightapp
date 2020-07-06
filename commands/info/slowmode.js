const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'slowmode',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You must be able to manage messages to use this command!")
      
      const errorEmbed = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("Please provide a time in seconds (No decimals)")
      .setColor("RED")
      .setTimestamp()
      
      const success = new MessageEmbed()
      .setTitle("Success!")
      .setDescription(`I have set the slowmode of <#${message.channel.id}> to **${args[0]} seconds**`)
      .setColor("GREEN")
      .setTimestamp()
      
      const time = args[0]
      if(!time) return message.channel.send(errorEmbed)
      if(message.channel.rateLimitPerUser == time) return message.channel.send(errorEmbed.setDescription("That is already this channel's slowmode"))
      message.channel.setRateLimitPerUser(time)
      message.channel.send(success)
}
}