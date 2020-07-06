const {MessageEmbed} = require('discord.js');
const database = require('quick.db')
module.exports={
    name: 'setcat',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      const errorEmbed = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("That is already your ticket category!")
      .setColor("RED")
      .setTimestamp()
      
      let channel = message.guild.channels.cache.get(args[0]);
      if(channel.type !== 'category') return message.reply("That is not a category!")
      
      const ticketCat = database.get(`tickets_${message.guild.id}`)
      if(ticketCat === channel.id) return message.channel.send(errorEmbed)
      database.set(`tickets_${message.guild.id}`, channel.id)
      
            const embed = new MessageEmbed()
      .setTitle("The tickets category has been set!")
      .setDescription(`I have set the ticket category channel to **${channel.name}**`)
      .setColor('GREEN')
      .setTimestamp()
            
            message.channel.send(embed)
      
    }
}