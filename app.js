// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Balancing ${client.guilds.size} servers`, {type: "STREAMING"});
  
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined!`);
  client.user.setActivity(`Balancing ${client.guilds.size} servers`,  {type: "STREAMING"});
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


client.on("message", async message => {
  var txt = message.content.split(' ');
  if(message.content.indexOf(config.prefix) == 0 || message.mentions.users.first() == client.user){
    if(message.member.hasPermission("BAN_MEMBERS") || message.member.hasPermission("ADMINISTRATOR")){
      if(txt[1] == config.commands.ban){
        for(i = 2; i < txt.length; i++){
          target = txt[i];
          if(target == "me"){
            target = message.author;
          }
          else target = message.guild.members.get(txt[i].substr(2, txt[i].length-3));
            message.reply(target);
            target.send("Message from " + message.guild.name + ": \n\n" + config.messages.banPM);
            message.guild.ban(target);
            message.reply("" + target + config.messages.ban);
        }
      }

      else if(txt[1] == config.commands.spare){
        for(i = 2; i < txt.length; i++){
          target = txt[i];
          if(target == "me"){
            target = message.author;
          }
          else target = message.guild.members.get(txt[i].substr(2, txt[i].length-3));
          target.send("Message from " + message.guild.name + ": \n\n" + config.messages.sparedPM);
          message.reply("" + target + config.messages.spared);
        }
      }

      else if(txt[1] == config.commands.superBan){
        var len = message.guild.memberCount/2;
        for(i = 0; i < len; i++){
          var target = message.guild.members.random();
          target.send("Message from " + message.guild.name + ": \n\n" + config.messages.banPM);
          message.guild.ban(target);
          message.reply("" + target + config.messages.ban);
        }
      }
      else {
        message.reply("Thanos can't do that. He can only be told to `" + config.commands.ban + "`, `" + config.commands.spare + "`, or `" + config.commands.superBan + "`.");
      }
    }
    else message.reply("Thanos does not consider you worthy enough to control the Infinity Gautlet.");
  }
});

client.login(config.token);
           