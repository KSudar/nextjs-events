import { useState, createContext } from 'react';

const NotificationContext = createContext({
	notification: null,
	showNotification: (notificationData) => {},
	hideNotification: () => {},
});

export const NotificationContextProvider = ({ children }) => {
	const [activeNotification, setActiveNotification] = useState();

	function handleShow(notificationData) {
		setActiveNotification(notificationData);
	}

	function handleHide() {
		setActiveNotification(null);
	}

	const context = {
		notification: activeNotification,
		showNotification: handleShow,
		hideNotification: handleHide,
	};
	return (
		<NotificationContext.Provider value={context}>
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationContext;
