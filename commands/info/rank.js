const { MessageEmbed, MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const { join } = require('path');
module.exports={
    name: 'rank',
    category: 'info',
    description: 'XP System & Rank Card',
    run: async(bot,message,args)=>{
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const data = await bot.db.get(`level-${message.guild.id}-${member.id}`);
      
      const errorEmbed = new MessageEmbed()
      .setTitle("Error!")
      .setDescription('This user does not have a rank!')
      .setColor("RED")
      .setTimestamp()
      
      if(!data) return message.channel.send(errorEmbed);

        const canvas = createCanvas(1000, 333);
        const ctx = canvas.getContext("2d");
        const background = await loadImage(join(__dirname, "..", "img", "background.png"));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#ffffff";
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#000000";
        ctx.fillRect(180, 216, 770, 65);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeRect(180, 216, 770, 65);
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 0.7;
        ctx.fillRect(180, 216, ((100 / (data.level * 40)) * data.xp) * 7.7, 65);
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.font = "30px Comfortaa";
        ctx.textAlign = "center";
        ctx.fillStyle = ("000000");
        ctx.fillText(`${data.xp} / ${data.level * 40} XP`, 600, 260);

        ctx.textAlign = "left";
        ctx.fillText(member.user.tag, 310, 120);

        ctx.font = "50px Comfortaa";
        ctx.fillText("Level:", 310, 180);
        ctx.fillText(data.level, 460, 180);

        ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
        ctx.lineWidth = 6;
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        const avatar = await loadImage(member.user.displayAvatarURL({ format: "jpg" }));
        ctx.drawImage(avatar, 40, 40, 250, 250);

        
      
      // const embed = new MessageEmbed()
      // .setTitle(`Rank card for ${member.user.tag}`)
      // .setColor(member.roles.highest.color)
      // .setImage(`attachment://${attachment}`)
      
      const attachment = new MessageAttachment(canvas.toBuffer(), "rank.png");
      
//       const exampleEmbed = {
// 	title: 'Some title',
// 	image: {
// 		url: 'attachment://rank.png',
// 	},
// };

// message.channel.send({ files: [attachment], embed: exampleEmbed });
      
//       message.channel.send(exampleEmbed)
        message.channel.send(`**Rank Card for ${member}**`, attachment);
      
//       let embed = new MessageEmbed()
//       .setAuthor(member.user.tag, member.user.displayAvatarURL())
//       .setDescription(`${member.user.username} is **level ${data.level}**!`)
//       .setFooter("This embed is temporary as we are having issues with the rank card!")
//       .setColor("RANDOM");
      
//       message.channel.send(embed)
    }
}