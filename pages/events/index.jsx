import { useRouter } from 'next/router';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { useEffect, useState } from 'react';
import { getAllEvents } from '../../helpers/ApiUtil';
import Head from 'next/head';

function EventsPage({ allEvents: allEventsProps }) {
	const router = useRouter();
	const allEvents = allEventsProps;

	function handleFindEvents(year, month) {
		router.push(`/events/${year}/${month}`);
	}

	if (!allEvents) {
		return <p>Loading...</p>;
	}

	if (!allEvents.length) {
		return <p>No events to display.</p>;
	}

	return (
		<>
			{allEvents.length && (
				<>
					<Head>
						<title>All Events</title>
						<meta name='description' content={`All events`} />
					</Head>
					<EventsSearch onSearch={handleFindEvents}></EventsSearch>
					<EventList events={allEvents} />
				</>
			)}
		</>
	);
}

export async function getStaticProps() {
	const allEvents = await getAllEvents();
	const props = { allEvents };
	return { props, revalidate: 60 };
}

export default EventsPage;
