const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'setmod',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply('Only admins can use this command!')
      const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
      if(!role) return message.reply("Please mention a role or provide a role ID!")
      if(args[1]) return message.reply("Invalid formatting!")
      database.set(`modrole_${message.guild.id}`, role.id)
      message.channel.send(`I have set the moderator role to **${role.name}**`)
    }
}