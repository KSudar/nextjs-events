import MainHeader from './MainHeader';
import { useContext } from 'react';
import NotificationContext from '../../store/NotificationContext';
function Layout({ children }) {
	const notificationCtx = useContext(NotificationContext);
	const activeNotification = notificationCtx.notification;
	return (
		<>
			<MainHeader />
			<main>{children}</main>
			{activeNotification && (
				<Notification
					title={activeNotification.title}
					message={activeNotification.message}
					status={activeNotification.status}
				/>
			)}
		</>
	);
}
export default Layout;
