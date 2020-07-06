const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'pickup',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
        let replies = ["Are you wifi? Because I can feel a connection.", "Are you tired? You've been running through my mind all day.", "Have you fallen from the sky? Because you're an angel.", "Are you a 45 degree angle? Because you're acute-y.", "If I could rearrange the alphabet, I would be U and I together.", "I must be a snowflake, because I have fallen for you.", "Are you a parking ticket? Because you've got fine written all over you.", "Do you believe in love at first sight? Or should I walk by again?", "I'm no photographer, but I can picture us together.", "Did your license get susupended for driving all these boys crazy?", "It's a good thing I have my library card because I am totally checking you out.", "Is your name Google? Because you have everything I've been searching for.", "Life without you is like a broken pencil, pointless.", "I think something's wrong with my eyes because I can't take them off you.", "We're not socks but I think we'd make a great pair.", "Do you have a map? I'm getting lost in your eyes.", "Do you like Star Wars? Because Yoda only one for me.", "Are you a magician? Because when I look at you everything else disappears.", "They say Disneyland is the happiest place on Earth. Well aparently nobody has ever been standing next to you.", "There's only one thing I want to change about you. Your last name.", "I'd say God Bless you, but it looks like he already did."]
let result = Math.floor((Math.random() * replies.length));
  
  message.channel.send(replies[result]);
    }
}