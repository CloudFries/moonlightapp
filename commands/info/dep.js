const {MessageEmbed} = require('discord.js');
const database = require('quick.db')
module.exports={
    name: 'dep',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      const user = message.author;
      if(args[0] === "all") return;
      
      if(message.content === "c!depall") return;
      
      if(args[1]) return message.reply("Invalid arguments!")
      
      if(!args[0]) return message.reply("Please specify a value to deposit!")
      
      let coins = database.get(`coins_${message.guild.id}_${user.id}`)
      
      if(args[0] > coins) return message.reply("You have insufficient funds for this!")
      
      if(coins == 0) return message.reply("You have no coins to deposit!")
      
      database.subtract(`coins_${message.guild.id}_${user.id}`, args[0])
      database.add(`bank_${message.guild.id}_${user.id}`, args[0])
      
      return message.reply(`You have succesfully deposited **$${args[0]}** to your bank!`)
    }
}