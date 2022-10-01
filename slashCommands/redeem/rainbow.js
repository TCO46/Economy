const schema = require("../../models/key")

module.exports = {
  name: "rainbow",
  description: "Key redeem for rainbow role",
  options: [
    {"String": { name: "key", description: "Redeem key for rainbow role", required: true }},
  ],
  run: async (client, interaction, args) => {
    const key = interaction.options.getString("key")
    schema.findOne({ key: key }, async(err, checkKey) => {
        if(checkKey) {
            //Cho role dưới này
            
            interaction.reply("vaild key")

            checkKey.delete()
        } else {
            interaction.reply("Invaild key. please try again")
        }
    })
  }
}