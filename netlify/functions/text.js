const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const axios = require('axios')

exports.handler = async (event) => {
	// optional! if you want to take in some other information, set a variable, etc. this is a good way to do it
  // const eventBody = JSON.parse(event.body)

	//get the URL from random.dog
  const getURL = async () => {
    try {
      const resp = await axios.get('https://random.dog/woof.json');
      return resp.data.url;
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }

	// set a variable to get the URL to pass in
  const dogLink = await getURL()
	
	// required info to pass into twilio function
  const sms = { 
    body: dogLink,
    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
    to: process.env.PHONE_NUMBER_DESTINATION
  }

  try {
		// define twilio function to be used
    const msgBody = await client.messages.create(sms)

		// return statement. msgbody actually called down there
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'YES', text: msgBody })
    }
	//catch block for error
  } catch (e) {
    return {
      statusCode: e.status,
      body: JSON.stringify({
        error: e,
        message: e.message
      })
    }
  }
}