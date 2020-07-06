// const {MessageEmbed} = require('discord.js');
// const database = require('quick.db')
// const ms = require('ms')
// module.exports={
//     name: 'tempmute',
//     category: 'info',
//     description: 'text here',
//     run: async(bot,message,args)=>{
      
//       const errorEmbed = new MessageEmbed()
//       .setTitle("Error!")
//          .setDescription("You did not specify a time!")
//          .setColor("RED")
//          .setTimestamp()
      
//  const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
//       const reason = args.slice(2).join(" ") || 'No reason given';
      
//       if(!message.guild.me.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) return message.channel.send(errorEmbed.setDescription("I do not have enough permissions to do this!"))
//       if(!user) return message.channel.send(errorEmbed)
//       if(user.user.bot) return message.channel.send(errorEmbed.setDescription("You cannot mute a bot!"))
//       if(message.author.id === user.id) return message.channel.send(errorEmbed.setDescription("You cannot mute yourself!"))
      
//       let role = database.get(`modrole_${message.guild.id}`)
//       if(!role) return message.channel.send(errorEmbed.setDescription("This guild does not have its Moderator role set!"))
//       if(!message.member.roles.cache.has(role)) return message.channel.send(errorEmbed.setDescription("You do not have the Moderator role!"))
//       if(user.roles.cache.has(role)) return message.channel.send(errorEmbed.setDescription("You cannot mute a Moderator!"))
      
//       if(!args[1].endsWith("d")&&!args[1].endsWith("h")&&!args[1].endsWith("m")&&!args[1].endsWith("s")) return message.channel.send(errorEmbed.setDescription("That is not a valid time!"))
//       if(isNaN(args[1][0])) return message.channel.send(errorEmbed.setDescription("That is not a number!"))
        
//         let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
//         if(!muterole){ 
//         muterole = await message.guild.roles.create({
//         data: {
//           name: 'Muted'
//           },
//         reason: 'Used to mute users',
// })
//         }
      
//       if(user.roles.cache.has(muterole.id)) {
//         return message.channel.send(errorEmbed.setDescription("That user is already muted!"))
//       }
      
//       message.guild.channels.cache.forEach(async (channel, id) => {
//           await channel.updateOverwrite(muterole, {
//             SEND_MESSAGES: false,
//             ADD_REACTIONS: false
//           })
//         })
//       user.roles.add(muterole.id)
      
//       setTimeout(() => {
//         user.roles.remove(muterole.id)
//       }, ms(args[0]))
      
//       const embed = new MessageEmbed()
//       .setAuthor(`${user.user.username} has been temporarily muted!`, user.user.displayAvatarURL())
//       .setDescription(`**Duration:** ${args[1]}\n**Reason:** ${reason}`)
//       .setTimestamp()
//       .setColor("BLUE");
      
//       message.delete()
//       message.channel.send(embed)
                 
//       const warnEmbed = new MessageEmbed()
//       .setTitle("User Muted")
//       .addField('User:', user, true)
//       .addField('Moderator:', message.author, true)
//       .addField('Reason:', reason, true)
//       .addField('Duration:', args[1], true)
//       .setTimestamp()
//       .setColor("BLUE")
      
//       const chx = database.get(`logchannel_${message.guild.id}`);
  
//         if(chx === null || 0) return; 
      
      
//       bot.channels.cache.get(chx).send(warnEmbed)
//       }
      
//     }