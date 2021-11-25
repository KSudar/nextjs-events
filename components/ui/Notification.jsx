import { useContext } from 'react';

import styles from './Notification.module.scss';
import NotificationContext from '../../store/NotificationContext';

function Notification({ title, message, status }) {
	const notificationCtx = useContext(NotificationContext);

	let statusClasses = '';

	if (status === 'success') {
		statusClasses = styles.success;
	}

	if (status === 'error') {
		statusClasses = styles.error;
	}

	if (status === 'pending') {
		statusClasses = styles.pending;
	}

	const activeClasses = `${styles.notification} ${statusClasses}`;

	return (
		<div className={activeClasses} onClick={notificationCtx.hideNotification}>
			<h2>{notificationCtx.notification.title}</h2>
			<p>{notificationCtx.notification.message}</p>
		</div>
	);
}

export default Notification;
