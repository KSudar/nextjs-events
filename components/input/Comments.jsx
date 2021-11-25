import { useState, useEffect, useContext } from 'react';
import CommentList from './CommentList';
import NewComment from './NewComment';
import styles from './Comments.module.scss';
import NotificationContext from '../../store/NotificationContext';

function Comments({ eventId }) {
	const [showComments, setShowComments] = useState(false);
	const [commentsList, setCommentsList] = useState([]);
	const notificationCtx = useContext(NotificationContext);

	useEffect(() => {
		(async () => {
			const response = await fetch(`/api/comments/${eventId}`);
			const { data } = await response.json();
			setCommentsList(
				data.sort((commentA, commentB) =>
					commentA.createdOn < commentB.createdOn ? 1 : -1
				)
			);
		})();
	}, [eventId]);

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus);
	}

	async function addCommentHandler({ ownerEmail, commentOwner, commentText }) {
		// send data to API
		notificationCtx.showNotification({
			title: 'Commenting...',
			message: 'Adding a comment.',
			status: 'pending',
		});
		const comment = {
			eventId: eventId,
			ownerEmail,
			commentOwner,
			commentText,
			createdOn: new Date().toLocaleDateString('hr-HR', {
				day: 'numeric',
				month: 'numeric',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			}),
		};

		try {
			const response = await fetch(`/api/comments/create`, {
				method: 'POST',
				body: JSON.stringify(comment),
			});
			if (!response.ok) {
				throw response;
			}
			const { commentId } = await response.json();
			setCommentsList([{ id: commentId, ...comment }, ...commentsList]);

			notificationCtx.showNotification({
				title: 'Success',
				message: `Comment was added`,
				status: 'success',
			});
		} catch (error) {
			notificationCtx.showNotification({
				title: 'Error',
				message: error.message || 'Adding comment failed!',
				status: 'error',
			});
		}
	}

	return (
		<section className={styles.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && <CommentList comments={commentsList} />}
		</section>
	);
}

export default Comments;
