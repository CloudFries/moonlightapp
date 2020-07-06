const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'roleinfo',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      const errorEmbed = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("That is not a valid role!")
      .setColor("RED")
      .setTimestamp()
      
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
  if (args[1]) return message.reply("You may not do that!");
  if (!role) return message.channel.send(errorEmbed)

  let roleEmbed = new MessageEmbed()
  .setAuthor(`${message.author.username}`)
  .setTitle("**Role Information!**")
  .setColor(role.color)
  .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL)
  .addField("**Role Name:**", role, true)
  .addField("**Role Color**", role.hexColor)
  .addField("**Role Created At:**", role.createdAt)
  .addField("**Users In Role:**", role.members.size)
  .addField("**Rank Of Role:**", message.guild.roles.cache.size - role.position);

  return message.channel.send(roleEmbed);
    }
}