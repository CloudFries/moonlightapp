const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'serverinfo',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
        if (args[1]) return message.reply("You may not do that!");
      
      let invite = await message.channel.createInvite({ 
        unique: true,
        maxAge: 0
 })
      
  let sicon = message.guild.iconURL;
  let serverembed = new MessageEmbed()
  .setDescription("***Server Information***")
  .setColor("RANDOM")
  .setThumbnail(message.guild.iconURL())
  .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL)
  .addField("**Server Name:**", message.guild.name)
  .addField("**Owner:**", message.guild.owner.user.tag)
  .addField("**Boosts:**", message.guild.premiumSubscriptionCount)
  .addField("**Boosts Level:**", message.guild.premiumTier)
  .addField("**Created On:**", message.guild.createdAt)
  .addField("**Total Members:**", message.guild.memberCount)
  .addField("**Online Members:**", message.guild.members.cache.filter(mem => mem.presence.status != "offline").size)
  .addField("**Role Count:**", message.guild.roles.cache.size - 1)
  .addField("**Verification Level:**", message.guild.verificationLevel)
  .addField("**Server Region:**", message.guild.region)

  return message.channel.send(serverembed);
    }
}