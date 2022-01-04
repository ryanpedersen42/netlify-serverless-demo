const mailgun = require("mailgun-js");
const axios = require('axios')

exports.handler = async (event) => {

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

	// set up mailgun (from docs)
	const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

	// set a variable to get the URL to pass in
	const dogLink = await getURL()

	const data = {
		// can also make these envars
		from: 'Dog Alert <cron@samples.mailgun.org>',
		to: 'ryanpeddev@gmail.com', 
		subject: 'NEW DOG!',
		// can choose text or html below
		// text: dogLink, 
		html: `<html><body><h1>!!Dog Alert!!</h1><a id="reset" target="_blank" href=${dogLink}>See the dog</a></body></html>`
	};

	try {
		const msgBody = await mg.messages().send(data)

		// return statement. msgbody actually called down there
		return {
			statusCode: 200,
			body: JSON.stringify({ status: 'sent a dog!', text: msgBody })
		};
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