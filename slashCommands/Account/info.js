const schema = require("../../models/register")
const auth = require("../../models/auth")
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "info",
  description: "Get the infomation about you",
  run: async (client, interaction, args) => {
    auth.findOne({ discord_id: interaction.user.id }, async(err, authCheck) => {
    if(authCheck.logined === false) return interaction.reply("You need to login to see your info")
        schema.findOne({ id: authCheck.userid }).then(user => {
            const embed = new MessageEmbed()
            .setTitle(`${user.username}`)
            .setColor("YELLOW")
            .setDescription(`UserId: ${user.userid}\nCreated date: ${user.createdAt}\nMoney: ${user.money}`)
            interaction.reply({ embeds: [embed], ephemeral: true })
        })

    })
  }
}