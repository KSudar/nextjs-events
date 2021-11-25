import { useRef, useState } from 'react';
import styles from './NewComment.module.scss';

function NewComment({ onAddComment }) {
	const [isInvalid, setIsInvalid] = useState(false);

	const emailRef = useRef();
	const commentOwnerRef = useRef();
	const commentTextRef = useRef();

	function sendCommentHandler(event) {
		event.preventDefault();

		const ownerEmail = emailRef.current.value;
		const commentOwner = commentOwnerRef.current.value;
		const commentText = commentTextRef.current.value;

		if (
			!ownerEmail ||
			ownerEmail.trim() === '' ||
			!ownerEmail.includes('@') ||
			!commentOwner ||
			commentOwner.trim() === '' ||
			!commentText ||
			commentText.trim() === ''
		) {
			setIsInvalid(true);
			return;
		} else {
			setIsInvalid(false);
		}

		onAddComment({
			ownerEmail,
			commentOwner,
			commentText,
		});
	}

	return (
		<form className={styles.form} onSubmit={sendCommentHandler}>
			<div className={styles.row}>
				<div className={styles.control}>
					<label htmlFor='email'>Your email</label>
					<input type='email' id='email' ref={emailRef} />
				</div>
				<div className={styles.control}>
					<label htmlFor='name'>Your name</label>
					<input type='text' id='name' ref={commentOwnerRef} />
				</div>
			</div>
			<div className={styles.control}>
				<label htmlFor='comment'>Your comment</label>
				<textarea id='comment' rows='5' ref={commentTextRef}></textarea>
			</div>
			{isInvalid && <p>Please enter a valid email address and comment!</p>}
			<button className={styles.commentSubmit}>Submit</button>
		</form>
	);
}

export default NewComment;
