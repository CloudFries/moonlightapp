// const {MessageEmbed} = require('discord.js');
// const ms = require('ms')
// const { saveGiveaway } = require('../../utils/giveaway')

// const prompts = [
//     'Give the giveaway a title',
//     'What is the prize?',
//     'How long should the giveaway last?',
//     'How many winners will there be?'
// ]

// module.exports={
//     name: 'giveaway',
//     category: 'info',
//     description: 'text here',
//     run: async(bot,message,args)=>{

// const errorEmbed = new MessageEmbed()
// .setTitle("Error!")
// .setDescription("You did not provide a channel!")
// .setColor("RED")
// .setTimestamp()

//         const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
//         if(!channel) return message.channel.send(errorEmbed)

//         try {
//             const embeds = await getResponses(message);
//             const embed = new MessageEmbed()
//             .setTitle(embeds.title)
//             .addField(`Prize:`, embeds.prize)
//             .addField("Duration:", embeds.duration, true)
//             .addField("Winners:", embeds.winners, true)
//             .setColor("GREEN")
//             const msg = await message.channel.send('**Confirm your giveaway**', embed)
//             await msg.react("✅");
//             await msg.react("⛔");

//             const filter = (reaction, user) => ['✅', "⛔"].includes(reaction.emoji.name) && !user.bot && user.id === message.author.id;
//             const reactions = await msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time', ] });

//             const choice = reactions.get('✅') || reactions.get('⛔');
//             if(choice.emoji.name === '✅') {
                
//                 embeds.endsOn = new Date(Date.now() + ms(embeds.duration));
//                 const giveawayEmbed = new MessageEmbed()
//                 .setTitle(embeds.title)
//                 .setDescription(
//                     `**Prize:** ${embeds.prize}\n
//                     **Ends On:** ${embeds.endsOn}\n
//                     **Winners:** ${embeds.winners}\n\n
//                     **REACT WITH 🎉 TO ENTER!**`
//                 )
//                 .setColor("GREEN")

//                 const giveawayMsg = await channel.send(giveawayEmbed);
//                 await giveawayMsg.react('🎉')
//                 embeds.messageId = giveawayMsg.id;
//                 embeds.guildId = giveawayMsg.guild.id;
//                 embeds.channelId = channel.id;
//                 await saveGiveaway(embeds);

//             } else if(choice.emoji.name === '⛔') {
//                 console.log('Rejected Giveaway');
//                 message.channel.send("**Cancelled Giveaway**")
//             }


//         } catch (err) {
//             console.log(err)
//         }
//     }
// }

// async function getResponses(message) {
//     const validTime = /^\d+(s|m|h|d)$/;
//     const validNumber = /\d+/;
//     const responses = { }

//     for(let i = 0; i < prompts.length; i++) {
//         await message.channel.send(prompts[i])
//         const response = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
//         const { content } = response.first();

//         if(i === 0) 
//             responses.title = content;
//         else if (i === 1)
//         responses.prize = content;
//         else if (i === 2) {
//             if (validTime.test(content))
//             responses.duration=content
//             else
//             throw new Error('Invalid time format')
//         }

//         else if (i === 3) {
//             if(validNumber.test(content))
//             responses.winners = content;
//             else
//                 throw new Error ('Invalid entry for winners')
//         }

        

//     }
//     return responses;
// }