async function handler(req, res) {
	try {
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
		res.status(201).json({
			message: 'Success!',
			email: JSON.parse(body),
		});
	} catch (error) {
		res.status(500).json({
			...error,
			message: 'Internal server error',
		});
	}
}
export default handler;
