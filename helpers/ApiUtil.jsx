import { filterEvents, objectToArrayById } from './Utils';

const getAllEvents = async () => {
	const response = await fetch(
		'https://reactjs-course-events-default-rtdb.europe-west1.firebasedatabase.app/events.json'
	);
	const data = await response.json();
	return objectToArrayById(data);
};

const getFeaturedEvents = async () => {
	const allEvents = await getAllEvents();
	return allEvents.filter((event) => event.isFeatured);
};

const getFilteredEvents = async (dateFilter) => {
	const { year, month } = dateFilter;
	const events = await getAllEvents();
	return filterEvents(events, year, month);
};

const getEventById = async (id) => {
	const events = await getAllEvents();
	return events.find((event) => event.id === id) || null;
};

const getAllEventsIds = async () => {
	const allEvents = await getAllEvents();
	const ids = allEvents.map((event) => event.id);
	return ids;
};

const getFeaturedEventsIds = async () => {
	const featuredEvents = await getFeaturedEvents();
	const ids = featuredEvents.map((event) => event.id);
	return ids;
};

export {
	getAllEvents,
	getFeaturedEvents,
	getFilteredEvents,
	getEventById,
	getAllEventsIds,
	getFeaturedEventsIds,
};
