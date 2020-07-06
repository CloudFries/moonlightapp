const {MessageEmbed} = require('discord.js');
const database = require('quick.db')
module.exports={
    name: 'with',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      if(args[0] === "all") return;
      
      const user = message.author;
      
      if(args[1]) return message.reply("Invalid arguments!")
      
      let coins = database.get(`coins_${message.guild.id}_${user.id}`)
      let bank = database.get(`bank_${message.guild.id}_${user.id}`)
      
      if(args[0] > bank) return message.reply("You have insufficient funds for this!")
      
      database.add(`coins_${message.guild.id}_${user.id}`, args[0])
      database.subtract(`bank_${message.guild.id}_${user.id}`, args[0])
      
      return message.reply(`You have succesfully withdrawn **$${args[0]}** from your bank!`)
    }
}