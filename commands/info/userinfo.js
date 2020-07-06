const {MessageEmbed} = require('discord.js');
const moment = require('moment');
module.exports={
    name: 'userinfo',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      //const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
  if (args[1]) return message.reply("You may not do that!");
  const color = member.displayColor
      
  let userinfo = {};
  userinfo.avatar = member.user.displayAvatarURL();
  userinfo.name = member.user.username;
  userinfo.discrim = `${member.user.discriminator}`;
  userinfo.id = member.user.id;
  userinfo.status = member.presence.status;
  userinfo.registered = moment.utc(member.user.createdAt).format("dddd, MMMM Do, YYYY");
  userinfo.joined = moment.utc(member.joinedAt).format("dddd, MMMM Do, YYYY");
  userinfo.created = moment.utc(message.createdAt).format("dddd, MMMM Do, YYYY");

  let uEmbed = new MessageEmbed()
  .setAuthor(member.user.tag, member.user.displayAvatarURL())
  .setTitle("**User Information!**")
  .setThumbnail(userinfo.avatar)
  .setColor(color)
  .setFooter(`Made by Cloud`, "https://cdn.discordapp.com/avatars/290143878315507712/7d6d046b57434d346a7bddacea80e25e.webp")
  .setTimestamp()
  .addField("**Username:**", userinfo.name, true)
  .addField("**Discriminator:**", `#${userinfo.discrim}`, true)
  .addField("**Highest Role:**", member.roles.highest)
  .addField("**Status:**", userinfo.status.toUpperCase(), true)
  .addField("**Game Playing:**", `${member.presence.game ? member.presence.game.name : `This user isn't playing anything currently!`}`, true)
  .addField("**Account Registered At:**", `${userinfo.registered} (${Math.floor(moment.duration(Date.now() - member.user.createdAt).asDays())} days)`)
  .addField("**Joined The Server At:**", `${userinfo.joined} (${Math.floor(moment.duration(Date.now() - member.joinedAt).asDays())} days)`);

  return message.channel.send(uEmbed);
    }
}