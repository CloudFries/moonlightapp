const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'avatar',
    category: 'info',
    description: "Displays the user's avatar",
    run: async(bot,message,args)=>{
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

  let Embed = new MessageEmbed()
  .setTitle(`${user.user.username}'s Avatar!`)
  .setImage(user.user.displayAvatarURL())
  .setColor("#03fcf4")

  message.channel.send(Embed);
}
    }