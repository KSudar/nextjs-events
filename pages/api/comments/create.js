async function handler(req, res) {
	try {
		const { method, body } = req;
		console.log('BODY ', body);
		const response = await fetch(
			'https://reactjs-course-events-default-rtdb.europe-west1.firebasedatabase.app/comments.json',
			{
				method,
				body,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const { name } = await response.json();
		res.status(201).json({
			message: 'Success!',
			commentId: name,
		});
	} catch (error) {
		res.status(500).json({
			...error,
			message: 'Internal server error',
		});
	}
}
export default handler;
