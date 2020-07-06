// const {MessageEmbed} = require('discord.js');
// const database = require('quick.db')
// const ms = require('ms')
// module.exports={
//     name: 'giveaway',
//     category: 'info',
//     description: 'text here',
//     run: async(bot,message,args)=>{
      
//       const errorEmbed = new MessageEmbed()
//       .setTitle("Error!")
//          .setDescription("You did not specify a time!")
//          .setColor("RED")
//          .setTimestamp()
      
//       const successEmbed = new MessageEmbed()
//       .setTitle("Success!")
//          .setDescription(`test`)
//          .setColor("GREEN")
//          .setTimestamp()
      
//       let giveawayRole = message.guild.roles.cache.find(r => r.name === "Giveaways") 
//       if(!giveawayRole){ 
//         giveawayRole = await message.guild.roles.create({
//         data: {
//           name: 'Giveaways',
//           color: 'YELLOW'
//           },
//         reason: 'Used for Giveaways'
// })
//       }
      

//       if(!message.member.roles.cache.has(giveawayRole.id)) return message.channel.send(errorEmbed.setDescription("You must have a role called **Giveaways**!"))
//       if(!args[0]) return message.channel.send(errorEmbed) 
//       // if(!message.member.roles.cache.has(giveawayRole.id)) return message.channel.send(errorEmbed.setDescription("You must be able to Manage Server or give a role called 'Giveaways'!"))
//       if(!args[0].endsWith("d")&&!args[0].endsWith("h")&&!args[0].endsWith("m")&&!args[0].endsWith("s")) return message.channel.send(errorEmbed.setDescription("That is not a valid time!"))
//       if(isNaN(args[0][0])) return message.channel.send(errorEmbed.setDescription("That is not a number!"))
//       let channel = message.mentions.channels.first()
//       if(!channel) return message.channel.send(errorEmbed.setDescription("Please memtion a channel!"))
//       let prize = args.slice(2).join(" ")
//       if(!prize) return message.channel.send(errorEmbed.setDescription("Please say a prize for the giveaway!"))
      
//       message.channel.send(successEmbed.setDescription(`Giveaway created in ${channel}!`))
      
//       let embed = new MessageEmbed()
//       .setTitle("New Giveaway!")
//       .setDescription(`${message.author} has started a giveaway for **${args[0]}** for **${prize}!**`)
//       .setTimestamp(Date.now()+ms(args[0]))
//       .setColor("GREEN")
//       let m = await channel.send(embed)
//       m.react("🎉")
      
//       setTimeout(() => {
//         let winner = m.reactions.cache.get("🎉").users.cache.filter(u=>!u.bot).random()
//         if(!winner) return channel.send("**Nobody has won the giveaway**")
//         channel.send(`${winner} has won the giveaway for **${prize}!**`)
//       }, ms(args[0]))
//     }
// }