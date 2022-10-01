//here the event starts
const config = require("../../botconfig/config.json")
module.exports = client => {
  try{
    try{
      const stringlength = 69;
      console.log(`Discord bot is online ${client.user.tag}`)
    }catch{ /* */ }
    //loop through the status per each 10 minutes
  
  } catch (e){
    console.log(String(e.stack).grey.italic.dim.bgRed)
  }
}