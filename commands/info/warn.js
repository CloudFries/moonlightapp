const {MessageEmbed} = require('discord.js');
const database = require('quick.db')
module.exports={
    name: 'warn',
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
      .setDescription("You cannot warn yourself!")
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
      .setDescription("You cannot warn a Moderator!")
      .setColor("RED")
      .setTimestamp()
      
      const errorEmbed7 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("Please set your logs channel!")
      .setColor("RED")
      .setTimestamp()
      
       const errorEmbed8 = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("You cannot warn a bot!")
      .setColor("RED")
      .setTimestamp()
      
     const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      const reason = args.slice(1).join(" ");
      if(!user) return message.channel.send(errorEmbed)
      if(user.user.bot) return message.channel.send(errorEmbed8)
      if(message.author.id == user.id) return message.channel.send(errorEmbed2)
      if(!reason) return message.channel.send(errorEmbed3)
      
      let role = database.get(`modrole_${message.guild.id}`)
      if(role === null || 0) return message.channel.send(errorEmbed4)
      if(!message.member.roles.cache.has(role)) return message.channel.send(errorEmbed5)
      if(user.roles.cache.has(role)) return message.channel.send(errorEmbed6)
      
      const embed = new MessageEmbed()
      .setAuthor(`${user.user.username} has been warned!`, user.user.displayAvatarURL())
      .setDescription(`**Reason:** ${reason}`)
      .setTimestamp()
      .setColor("BLURPLE");
      
      message.delete()
      message.channel.send(embed)
      
      let warnings = database.get(`warnings_${message.guild.id}_${user.id}`)
      if(warnings === null || 0) {
        warnings = 0
      }
      
      const warnEmbed = new MessageEmbed()
      .setTitle("User Warned")
      .addField('User:', user, true)
      .addField('Moderator:', message.author, true)
      .addField('Reason:', reason, true)
      .addField('Warnings:', warnings + 1)
      .setTimestamp()
      .setColor("BLURPLE")
      
      const chx = database.get(`modlogs_${message.guild.id}`);
  
        if(chx === null || 0) return message.channel.send(errorEmbed7) 
      
      database.add(`warnings_${message.guild.id}_${user.id}`, 1)
      bot.channels.cache.get(chx).send(warnEmbed);
      
    }
}