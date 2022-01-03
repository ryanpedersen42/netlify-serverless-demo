const mailgun = require("mailgun-js");
const axios = require('axios')

exports.handler = async (event) => {

	const getURL = async () => {
		try {
			const resp = await axios.get('https://random.dog/woof.json');
			return resp.data.url;
		} catch (err) {
			// Handle Error Here
			console.error(err);
		}
	}

	const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

	const dogLink = await getURL()

	const data = {
		from: 'Dog Alert <cron@samples.mailgun.org>',
		to: 'ryanpeddev@gmail.com',
		subject: 'NEW DOG!',
    // text: dogLink,
		html: `<html><body><h1>!!Dog Alert!!</h1><a id="reset" target="_blank" href=${dogLink}>See the dog</a></body></html>`
	};

	try {
		const msgBody = await mg.messages().send(data)
		return {
			statusCode: 200,
			body: JSON.stringify({ status: 'sent a dog!', text: msgBody })
		};
	}
	catch (e) {
		console.log('error here', e)
	}
}