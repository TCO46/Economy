const auth = require("../../models/auth")

module.exports = {
  name: "logout",
  description: "Logout",
  run: async (client, interaction, args) => {
    auth.updateOne(
        {
        discord_id: interaction.user.id,
        logined: true
        },
        {
        logined: false
      }).then(data => {
        console.log(data)
      })

      interaction.reply({ content: "Successfuly logouted", ephemeral: true });

  }
}