import express from "express"
import twilio from "twilio"

const smsRouter = new express.Router()

smsRouter.post("/", async (req, res) => {
  
 console.log("Sending sms from Save This Date...")
  var accountSid = 'Axxxxxxxxxxxxxxx'; // Your Account SID from www.twilio.com/console
  var authToken = '3xxxxxxxxxxxx';   // Your Auth Token from www.twilio.com/console
  var client = new twilio(accountSid, authToken);
  client.messages.create({
    body: 'Save This Date: 12/07/2021 for Launch 31 Reunion!',
    to: '7815263105',  
    from: '2062796872' 
  })
  .then((message) => {
    console.log("message:")
    console.log(message)
    console.log(message.sid)
  })
  .catch((error) => {
    console.log(error)
  })
})

export default smsRouter