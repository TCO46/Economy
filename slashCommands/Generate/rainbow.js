const schema = require("../../models/key")

module.exports = {
    name: "rainbow",
    description: "Generate key redeem for rainbow role",
    run: async (client, interaction, args) => {
        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
           }
           return result;
        }
        const key = makeid(20)

        new schema({
            key: key
        }).save()
        
        interaction.reply({ content: `Key: ${key} (You can only redeem this key once)`, ephemeral: true })
    }
}