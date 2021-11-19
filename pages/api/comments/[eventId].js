import { getAllComments } from '../../../helpers/ApiUtil';

async function handler(req, res) {
	const eventId = req.query.eventId;

	if (req.method === 'GET') {
		try {
			const comments = await getAllComments();
			const data =
				comments.filter((comment) => comment.eventId === eventId) || null;

			res.status(200).json({
				data,
			});
		} catch (error) {
			res.status(500).json({
				...error,
				message: 'Internal server error',
			});
		}
	}
}
export default handler;
