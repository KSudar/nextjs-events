const objectToArrayById = (serverData) => {
	return Object.keys(serverData).map((key) => ({
		id: key,
		...serverData[key],
	}));
};

const filterEvents = (events, year, month) => {
	return events.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
		);
	});
};

export { objectToArrayById, filterEvents };
