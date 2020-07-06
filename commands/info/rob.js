// const {MessageEmbed} = require('discord.js');
// const database = require('quick.db');
// const ms = require('parse-ms');
// module.exports={
//     name: 'rob',
//     category: 'info',
//     description: 'text here',
//     run: async(bot,message,args)=>{
      
//       if(args[1]) return message.reply("You provided invalid arguments!")
      
//       let cooldown = 3.6e+6,
//         amount = 200;
      
//       let lastRob = await database.fetch(`lastRob_${message.guild.id}_${message.author.id}`);
//       if (lastRob !== null && cooldown - (Date.now() - lastRob) > 0) {
//         let timeObj = ms(cooldown - (Date.now() - lastRob));
        
//         message.channel.send(`You have already robbed someone, please wait **${timeObj.minutes}m** to work again!`)
//       } else {
        
        
//         const user = message.mentions.users.first()
//         const author = message.author;
        
//         if(user === author) return message.reply("You cannot rob yourself silly.")
        
//         let coins = database.get(`coins_${message.guild.id}_${user.id}`)
      
//         let amount = Math.floor(Math.random() * 200) + 1;
        
//         if(coins = 0) return message.reply("This user has no cash!")
        
//         message.reply(`You robbed **${user.username}** for **$${amount}!**`);
        
//         database.set(`lastRob_${message.guild.id}_${message.author.id}`, Date.now());
//         database.add(`coins_${message.guild.id}_${author.id}`, amount)
//         database.subtract(`coins_${message.guild.id}_${user.id}`, amount)
//       }
//     }
// }