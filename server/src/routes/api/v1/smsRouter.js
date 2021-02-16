import express from "express"
import twilio from "twilio"

const smsRouter = new express.Router()

smsRouter.post("/", async (req, res) => {
  
 console.log("Sending sms from Save This Date...")
  var accountSid = "AC250d66fac695aac16f28a0e53ee76d81"
  var authToken = "374720eb51088e9821192338e8687235"
  var client = new twilio(accountSid, authToken);
  client.messages.create({
    body: 'Save This Date: 12/07/2021 for Launch 31 Reunion!',
    to: '7815263105',  
    from: '2062796872'
    //mediaUrl: ['https://photos.google.com/search/_tra_/photo/AF1QipMGFZ_necM7SWWngZVTb89GtzHyUoCLYoVwb8ZH']
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