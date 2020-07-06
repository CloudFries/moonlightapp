const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'setmsg',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      const errorEmbed = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("Only admins can use this command!")
      .setColor("RED")
      .setTimestamp()
      
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(errorEmbed)
      let logs = database.get(`modlogs_${message.guild.id}`)
      const channel = message.mentions.channels.first()
      if(!channel) return message.channel.send(errorEmbed.setDescription("Please mention a channel!"))
      // if(channel.type === "category") return message.channel.send
      
      if(logs === channel.id) return message.channel.send(errorEmbed.setDescription("That is already your message logs channel!"))
      
      if(args[1]) return message.channel.send(errorEmbed.setDescription("Invalid formatting!"))
      database.set(`messagelogs_${message.guild.id}`, channel.id)
      
      const successEmbed = new MessageEmbed()
      .setTitle("Success!")
      .setDescription(`I have set the message logs channel to ${channel}`)
      .setColor("GREEN")
      .setTimestamp()
      
      message.channel.send(successEmbed)
    }
}