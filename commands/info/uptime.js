const { MessageEmbed } = require("discord.js");
const ms = require('ms');
module.exports = {
  name: "uptime",
  category: "info",
  description: "Returns the uptime of the bot.",
  usage: ".uptime",
  run: async (bot, message, args) => {
    const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("🕒 Cloudy Uptime 🕒")
    .setDescription(`I have been online for \**${ms(bot.uptime, { long: true })}\**`)
    message.channel.send(embed)
  }
};
