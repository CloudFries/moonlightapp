const database = require('quick.db');
const { MessageEmbed, Collection, Client } = require("discord.js");
const { VultrexDB } = require("vultrex.db");
const bot = new Client();
const db = new VultrexDB({
  provider: "sqlite",
  table: "tableName",
  fileName: "XP"
});
const { readdirSync } = require("fs");
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = readdirSync("./commands/");

require('./handlers/command')(bot);
require("dotenv").config()
require('./structures/functions')(bot) //

//Bot is online message/status
bot.on("ready", () => {
  console.log(
    `${bot.user.username} is online on ${bot.guilds.cache.size} servers!`
  );
  bot.user.setActivity(`Cloud Bot Beta`, { type: "PLAYING" });
});

bot.on('messageDelete', async message => {

  if (message.author.bot) return;

  let errorEmbed = new MessageEmbed()
    .setTitle("Error!")
    .setDescription("blah")
    .setColor("RED")
    .setTimestamp()

  let embed = new MessageEmbed()
    .setTitle("Message Deleted")
    .setDescription(`**${message.author}** has deleted a message in ${message.channel}`)
    .addField("Content", message.content, true)
    .setColor("RED")
    .setTimestamp()

  const chx = database.get(`messagelogs_${message.guild.id}`);

  if (chx === null || 0) return;


  bot.channels.cache.get(chx).send(embed)

  // let channel = message.guild.channels.cache.find(c => c.name === "msg-logs")
  // if(!channel) return;
  // channel.send(embed)
});

bot.on(`messageUpdate`, async (oldMessage, newMessage) => {

  if (oldMessage.author.bot) return;

  let errorEmbed = new MessageEmbed()
    .setTitle("Error!")
    .setDescription("blah")
    .setColor("RED")
    .setTimestamp()

  let embed = new MessageEmbed()
    .setTitle("Message Edited")
    .setColor("YELLOW")
    .setTimestamp()
    .setDescription(`**${oldMessage.author} has edited their message in ${oldMessage.channel}**`)
    .addField("Old Message", oldMessage.content, true)
    .addField("New Message", newMessage.content, true)

  const chx = database.get(`messagelogs_${oldMessage.guild.id}`);

  if (chx === null || 0) return;


  bot.channels.cache.get(chx).send(embed)


  // let channel = oldMessage.guild.channels.cache.find(c => c.name === "msg-logs")
  // if(!channel) return;
  // channel.send(embed)
})





bot.on(`message`, async message => {

  const database2 = require('quick.db');
  let prefix = database2.get(`prefix_${message.guild.id}`)
  if (prefix === null || 0) prefix = "c!"
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return message.reply(`<@${message.author.id}>, I cannot repond to commands in DMs`);
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = bot.commands.get(cmd);
  if (!command) {
    command = bot.commands.get(bot.aliases.get(cmd));
    if (message.content !== command) return message.reply("**That is not a command**")
  }
  if (command) command.run(bot, message, args);

  //COMMANDS

  // const prefixRegex = new RegExp(`^(<@!?${bot.user.id}>|${escapeRegex(prefix)})\\s*`);
  // if (!prefixRegex.test(message.content)) return;


  if (message.content.startsWith(`<@!${bot.user.id}>`)) return message.channel.send(`That's me! My prefix in this server is \`${prefix}\`.`);

  if (message.content.toLowerCase() === "c!dep all") {

    let database = require('quick.db');

    const user = message.author;

    if (args[1]) return message.reply("Invalid arguments!")

    let coins = database.get(`coins_${message.guild.id}_${user.id}`)
    let bank = database.get(`bank_${message.guild.id}_${user.id}`)

    if (coins == 0) return message.reply("You have no coins to deposit!")

    database.set(`coins_${message.guild.id}_${user.id}`, 0)
    database.add(`bank_${message.guild.id}_${user.id}`, coins)

    return message.reply(`You have succesfully deposited **$${coins}** to your bank!`)
  }

  if (message.content.toLowerCase() === "c!with all") {

    let database = require('quick.db');

    const user = message.author;

    if (args[1]) return message.reply("Invalid arguments!")

    let coins = database.get(`coins_${message.guild.id}_${user.id}`)
    let bank = database.get(`bank_${message.guild.id}_${user.id}`)

    if (bank == 0) return message.reply("You have no coins to withdraw!")

    database.set(`bank_${message.guild.id}_${user.id}`, 0)
    database.add(`coins_${message.guild.id}_${user.id}`, bank)

    return message.reply(`You have succesfully withdrawn **$${bank}** from your bank!`)
  }



  //XP SYSTEM
  const levelInfo = await bot.db.get(
    `level-${message.guild.id}-${message.author.id}`,
    {
      level: 1,
      xp: 0,
      totalXp: 0
    }
  );

  const generatedXp = Math.floor(Math.random() * 16);
  levelInfo.xp += generatedXp;
  levelInfo.totalXp += generatedXp;

  if (levelInfo.xp >= levelInfo.level * 40) {
    levelInfo.level++;
    levelInfo.xp = 0;
    message.reply(`You are now level **${levelInfo.level}**! GG.`);
  }

  await bot.db.set(`level-${message.guild.id}-${message.author.id}`, levelInfo);

  const database = new VultrexDB({
    provider: "sqlite",
    table: "tableName",
    fileName: "Coins"
  });
});

db.connect().then(() => {
  bot.db = db;
  const token = process.env.DISCORD_TOKEN;
  bot.login(token);
});