const { MessageActionRow, Modal, TextInputComponent } = require("discord.js");
const { checkPassword, makeid } = require("../../handlers/functions");
const register = require("../../models/register.js");
const auth = require("../../models/auth")
const bcrypt = require('bcrypt');

module.exports = {
  name: "register",
  description: "Make a new account",
  run: async (client, interaction, args) => {
    const modal = new Modal();
    modal.setTitle("Register");
    modal.setCustomId("register");

    const username = new TextInputComponent()
      .setCustomId("username")
      .setLabel("Username")
      .setStyle("SHORT");

    const password = new TextInputComponent()
      .setCustomId("password")
      .setLabel("Password")
      .setStyle("SHORT");

    const repeatPassword = new TextInputComponent()
      .setCustomId("repassword")
      .setLabel("Repeat Password")
      .setStyle("SHORT");

    const action1 = new MessageActionRow().addComponents(username);
    const action2 = new MessageActionRow().addComponents(password);
    const action3 = new MessageActionRow().addComponents(repeatPassword);

    modal.addComponents(action1, action2, action3);

    await interaction.showModal(modal);

    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isModalSubmit()) return;
      if (interaction.customId == "register") {
        const username = interaction.fields.getTextInputValue("username");
        const password = interaction.fields.getTextInputValue("password");
        const repassword = interaction.fields.getTextInputValue("repassword");
        const id = makeid(15);
        if (checkPassword(password, repassword) !== false) {
          interaction.reply({
            content: "Please type the password again",
            ephemeral: true,
          });
        } else {
          auth.findOne({ discord_id: interaction.user.id}).then(user => {
            if(user) {
              return;
            } else {
              new auth({
                discord_id: interaction.user.id,
                logined: false,
                userid: 0
              }).save()
            }
          })
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hashedPass) {

              new register({
                username: username,
                password: hashedPass,
                userid: id,
                money: 0
              }).save();
              
              interaction.reply({ content: "Account created", ephemeral: true });
            })
          })
        }
      }
    });
  },
};
