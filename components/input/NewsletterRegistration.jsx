import { useRef, useContext } from 'react';
import NotificationContext from '../../store/NotificationContext';
import styles from './NewsletterRegistration.module.scss';

function NewsletterRegistration() {
	const emailRef = useRef();
	const notificationCtx = useContext(NotificationContext);

	async function registrationHandler(event) {
		event.preventDefault();
		notificationCtx.showNotification({
			title: 'Signing up...',
			message: 'Registering for newsletter',
			status: 'pending',
		});
		const email = emailRef.current.value;
		try {
			const response = await fetch(`/api/newsletter/add`, {
				method: 'POST',
				body: JSON.stringify(email),
			});
			if (!response.ok) {
				throw response;
			}
			notificationCtx.showNotification({
				title: 'Signing up success',
				message: `You've signed up for newsletter`,
				status: 'success',
			});
		} catch (error) {
			notificationCtx.showNotification({
				title: 'Error',
				message: error.message || 'Signing up failed!',
				status: 'error',
			});
		}

		// fetch user input (state or refs)
		// optional: validate input
		// send valid data to API
	}

	return (
		<section className={styles.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				<div className={styles.control}>
					<input
						type='email'
						id='email'
						placeholder='Your email'
						aria-label='Your email'
						ref={emailRef}
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
}

export default NewsletterRegistration;
