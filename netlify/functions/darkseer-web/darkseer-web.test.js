import { strict as assert } from 'node:assert';

async function fetchDarkSeerWeb(body) {
	const apiURL = new URL('http://localhost/.netlify/functions/darkseer-web');
	const isNumberRegEx = /^\d+$/;
	const apiPort = '8888' || process.env.PORT;
	if (apiPort != null) {
		assert.match(apiPort, isNumberRegEx);
	}
	apiURL.port = apiPort;
	const res = await fetch(apiURL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(body),
	});
	if (res.headers.get('content-type').startsWith('application/json')) {
		const data = await res.json();
		return data;
	} else {
		const message = await res.text();
		return {message};
	}
}

/**
 * Assumes `netlify dev` command is running.
 */
async function main() {
	const data = await fetchDarkSeerWeb({
		prompt: 'Hello world!',
	});
	console.log(data);
}

main()
	.then(() => {console.log('Success'); process.exit(0);})
	.catch((error) => {console.error(error); process.exit(1); });
