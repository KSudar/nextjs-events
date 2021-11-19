import styles from './CommentList.module.css';

function CommentList({ comments }) {
	if (!comments || !comments.length) {
		return <p>No comments to display!</p>;
	}
	return (
		<ul className={styles.comments}>
			{/* Render list of comments - fetched from API */}
			{comments.map((comment) => (
				<li key={comment.id}>
					<p>{comment.commentText}</p>
					<div>
						<div>
							<address>{comment.createdOn}</address>
						</div>
						By <address>{comment.commentOwner}</address>
					</div>
				</li>
			))}
		</ul>
	);
}

export default CommentList;
