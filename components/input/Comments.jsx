import { useState, useEffect } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import styles from './Comments.module.css';
import { getAllComments } from '../../helpers/ApiUtil';

function Comments({ eventId, context }) {
	const [showComments, setShowComments] = useState(false);
	const [commentsList, setCommentsList] = useState([]);

	console.log('CONTEXT ', context);

	useEffect(() => {
		(async () => {
			const response = await fetch(`/api/comments/${eventId}`);
			const { data } = await response.json();
			console.log('DATA ', data);
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

		const response = await fetch(`/api/comments/create`, {
			method: 'POST',
			body: JSON.stringify(comment),
		});
		const { commentId } = await response.json();
		setCommentsList([{ id: commentId, ...comment }, ...commentsList]);
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
