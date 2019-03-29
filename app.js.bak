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

  if(message.content.toLowerCase().indexOf(config.prefix.toLowerCase()) == 0){
    var botMem = message.guild.members.get(config.id);
    var botPos = botMem.highestRole.calculatedPosition;
    if(message.member.hasPermission("BAN_MEMBERS") || message.member.hasPermission("ADMINISTRATOR")){
      if(txt[1] == config.commands.ban){
        if(txt.length > 2){
          for(i = 2; i < txt.length; i++){
            try{
              var target = txt[i];
              target = message.guild.members.get(target.replace(/\D/g,''));
              if(target == message.member || txt[i].toLowerCase() == "me") message.reply(config.messages.selfBan);
              else if(target == botMem || txt[i].toLowerCase() == "thanos") message.reply(config.messages.thanosBan);
              else if(botPos < target.highestRole.calculatedPosition) message.reply("Thanos cannot ban " + target + ", he doesn't have enough power. Make sure he overpowers " + target + " by ensuring his highest role is higher than " + target + "'s highest role, which is " + target.highestRole);
              else{
                target.send("Message from " + message.guild.name + ": \n\n" + config.messages.banPM);
                message.guild.ban(target);
                message.reply("" + target + config.messages.ban);
              }
            }
            catch(e){
              message.reply("Thanos does not know how to ban \"" + txt[i] + "\", he can only ban individual users or attempt to ban half of everyone on the server with `"+ config.commands.superBan + "`.");
              console.log(e);
            }
          }
        } else message.reply(config.messages.banNoName);
      }

      else if(txt[1] == config.commands.spare){
        if(txt.length > 2){
          for(i = 2; i < txt.length; i++){
            try{
              var target = txt[i];
              target = message.guild.members.get(target.replace(/\D/g,''));
              if(target == message.member || txt[i].toLowerCase() == "me") message.reply(config.messages.selfSpare);
              else if(target == botMem || txt[i].toLowerCase() == "thanos") message.reply(config.messages.thanosSpare);
              else if(botPos < target.highestRole.calculatedPosition) message.reply("Thanos cannot spare " + target + ", he doesn't have enough power. Make sure he overpowers " + target + " by ensuring his highest role is higher than " + target + "'s highest role, which is " + target.highestRole);
              else{
                target.send("Message from " + message.guild.name + ": \n\n" + config.messages.sparePM);
                message.reply("" + target + config.messages.spare);
              }
            }
            catch(e){
              message.reply("Thanos does not know how to spare \"" + txt[i] + "\", he can only spare one or more individual users.");
              console.log(e);
            }
          }
        } else message.reply(config.messages.spareNoName);
      }

      else if(txt[1] == config.commands.superBan){
        var len = message.guild.memberCount/2;
        for(i = 0; i < len; i++){
          try{
            var target = message.guild.members.random();
              if(target == message.member)message.reply(config.messages.selfBan);
              else if(target == botMem) message.reply(config.messages.thanosBan);
              else if(botPos < target.highestRole.calculatedPosition) message.reply("Thanos cannot ban " + target + ", he doesn't have enough power. Make sure he overpowers " + target + " by ensuring his highest role is higher than " + target + "'s highest role, which is " + target.highestRole);
              else{
                target.send("Message from " + message.guild.name + ": \n\n" + config.messages.banPM);
                message.guild.ban(target);
                message.reply("" + target + config.messages.ban);
              }
          }
          catch(e){message.reply("Thanos does not know how to ban " + target + "."); console.log(e);}
        }
        for(target in message.guild.members){
          target.send("Message from " + message.guild.name + ": \n\n" + config.messages.sparePM + "*You either asked Thanos to balance the server, were too powerful for Thanos to snap you, or he actually chose you to stay alive...*");
        }
      }
      else {
        message.reply("Thanos can't do that. He can only be told to `" + config.commands.ban + "` or `" + config.commands.spare + "` one or more users, or he could `" + config.commands.superBan + "`, which will attempt to ban half the server at random.");
      }
    }
    else message.reply(config.messages.invalidPerm);
  }
});

client.login(config.token);
