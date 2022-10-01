const Discord = require("discord.js");
const config = require(`./botconfig/config.json`);
const settings = require(`./botconfig/settings.json`);
const colors = require("colors");
const mongoose = require("mongoose");

const client = new Discord.Client({
  fetchAllMembers: true,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["users"],
    repliedUser: false,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767,
});

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = require("fs").readdirSync(`./commands`);
["events", "commands", "slashCommands", settings.antiCrash ? "antiCrash" : null]
  .filter(Boolean)
  .forEach((h) => {
    require(`./handlers/${h}`)(client);
  });

mongoose
  .connect(config.mongo_server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

client.login(config.token);
