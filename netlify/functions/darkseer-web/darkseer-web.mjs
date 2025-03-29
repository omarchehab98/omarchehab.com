// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
export default async (request, context) => {
  try {
		if (request.method !== 'POST') {
			throw new Error('Unexpected request method');
		}
		if (!request.headers.get('content-type')?.startsWith('application/json')) {
			throw new Error('Unexpected content-type header');
		}

		const {data: {prompt}} = await request.json();

    return Response.json({
			message: 'Prompt ' + prompt,
		})
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    })
  }
}
