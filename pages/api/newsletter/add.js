async function handler(req, res) {
	try {
		console.log('OVDJE');
		const { method, body } = req;
		const response = await fetch(
			'https://reactjs-course-events-default-rtdb.europe-west1.firebasedatabase.app/newsletter.json',
			{
				method,
				body,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (!response.ok) {
			throw response;
		}
		res.status(response.status).json({
			message: response.statusText,
			email: JSON.parse(body),
		});
	} catch (error) {
		res.status(error.status).json({
			...error,
		});
	}
}
export default handler;
