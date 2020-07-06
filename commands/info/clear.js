const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'clear',
    category: 'info',
    description: 'Clears the mentioned amount of messages',
    run: async(bot,message,args)=>{
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You may not use this command!");
        if(!args[0]) return message.channel.send("Please add a number of messages to clear");
        if(args[0] > 99) return message.reply("**Please provide a number less than 100!**")
        let deleteamt = parseInt(args[0]) + 1;
      
        let role = database.get(`modrole_${message.guild.id}`)
        let backup = message.guild.roles.cache.find(role => role.name === "Moderator");
        if(role === null || 0) return message.reply("This guild does not have its moderator role set!")
        if(!message.member.roles.cache.has(role)) return message.reply("You do not have the moderator role!")
      
      const clearedEmbed = new MessageEmbed()
      .setTitle("Success")
      .setDescription(`I have cleared ${args[0]} messages`)
      .setColor("GREEN")
      .setTimestamp()
      
        message.channel.bulkDelete(deleteamt).then(() => {
          message.channel.send(clearedEmbed).then(msg => {
            msg.delete({ timeout: 3000 })
            });
        });
    }
}