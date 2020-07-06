const {MessageEmbed} = require('discord.js');
const database = require('quick.db')
const ms = require('ms')
module.exports={
    name: 'unmute',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
       const errorEmbed = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("That is not a valid member!")
      .setColor("RED")
      .setTimestamp()
      
      const errorEmbed2 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("You cannot mute yourself!")
      .setColor("RED")
      .setTimestamp()
      
      const errorEmbed3 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("Please provide a reason!")
      .setColor("RED")
      .setTimestamp()
      
      const errorEmbed4 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("This guild does not have its Moderator role set!")
      .setColor("RED")
      .setTimestamp()
      
      const errorEmbed5 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("You do not have the Moderator role!")
      .setColor("RED")
      .setTimestamp()
      
      const errorEmbed6 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("You cannot unmute a Moderator!")
      .setColor("RED")
      .setTimestamp()
      
      const errorEmbed7 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("Please set your logs channel!")
      .setColor("RED")
      .setTimestamp()
      
       const errorEmbed8 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("You cannot unmute a bot!")
      .setColor("RED")
      .setTimestamp()
       
       const errorEmbed9 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("I do not have enough permissions to do this!")
      .setColor("RED")
      .setTimestamp()
       
       const errorEmbed10 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription('There is no "Muted" role!')
      .setColor("RED")
      .setTimestamp()
       
       const errorEmbed11 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription('That user is not muted!')
      .setColor("RED")
      .setTimestamp()
      
     const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      const reason = args.slice(1).join(" ");
      if(!message.guild.me.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) return message.channel.send(errorEmbed9)
      if(!user) return message.channel.send(errorEmbed)
      if(user.user.bot) return message.channel.send(errorEmbed8)
      if(message.author.id == user.id) return message.channel.send(errorEmbed2)
      
      let role = database.get(`modrole_${message.guild.id}`)
      if(role === null || 0) return message.channel.send(errorEmbed4)
      if(!message.member.roles.cache.has(role)) return message.channel.send(errorEmbed5)
      if(user.roles.cache.has(role)) return message.channel.send(errorEmbed6)
      
      const time = args[1]
        
        let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
        if(!muterole){
          return message.channel.send(errorEmbed10)
        }
      if(!user.roles.cache.has(muterole.id)) {
        return message.channel.send(errorEmbed11)
      }
      user.roles.remove(muterole.id)
      
      const embed = new MessageEmbed()
      .setAuthor(`${user.user.username} has been unmuted!`, user.user.displayAvatarURL())
      .setTimestamp()
      .setColor("BLUE");
      
      message.delete()
      message.channel.send(embed)
                 
      const warnEmbed = new MessageEmbed()
      .setTitle("User Unmuted")
      .addField('User:', user, true)
      .addField('Moderator:', message.author, true)
      .setTimestamp()
      .setColor("BLUE")
      
      const chx = database.get(`modlogs_${message.guild.id}`);
  
        if(chx === null || 0) return message.channel.send(errorEmbed7) 
      
      
      bot.channels.cache.get(chx).send(warnEmbed)
    }
}