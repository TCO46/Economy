const { MessageActionRow, Modal, TextInputComponent } = require("discord.js");
const schema = require("../../models/register.js");
const auth = require("../../models/auth");
const bcrypt = require("bcrypt");

module.exports = {
  name: "login",
  description: "Login",
  run: async (client, interaction, args) => {
    auth.findOne({ discord_id: interaction.user.id }, async (err, authCheck) => {
      if (authCheck.logined === true) {
        interaction.reply("You already logined");
      } else {
        const modal = new Modal();
        modal.setTitle("Login");
        modal.setCustomId("login");

        const username = new TextInputComponent()
          .setCustomId("username")
          .setLabel("Username")
          .setStyle("SHORT");

        const password = new TextInputComponent()
          .setCustomId("password")
          .setLabel("Password")
          .setStyle("SHORT");

        const action1 = new MessageActionRow().addComponents(username);
        const action2 = new MessageActionRow().addComponents(password);

        modal.addComponents(action1, action2);

        await interaction.showModal(modal);

        client.on("interactionCreate", async (interaction) => {
          if (!interaction.isModalSubmit()) return;
          if (interaction.customId == "login") {
            const username = interaction.fields.getTextInputValue("username");
            const password = interaction.fields.getTextInputValue("password");

            schema.findOne({ username: username }, async (err, user) => {
              if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                  if (result) {

                    auth
                      .updateOne(
                        {
                          discord_id: interaction.user.id,
                          logined: false,
                          userid: authCheck.userid
                        },
                        {
                          logined: true,
                          userid: user.userid
                        }
                      )
                      .then((data) => {
                        console.log(data);
                      });
                    interaction.reply(`You are now login as ${user.username}`);
                    console.log(user.createdAt)
                  } else {
                    interaction.reply({ content: "Password does not match" });
                  }
                });
              } else {
                interaction.reply({ content: "User is not exist" });
              }
            });
          }
        });
      }
    });
  },
};
