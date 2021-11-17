import { getEventById, getFeaturedEventsIds } from '../../helpers/Apiutil';
import EventSummary from '../../components/eventDetail/EventSummary';
import EventLogistics from '../../components/eventDetail/EventLogistics';
import EventContent from '../../components/eventDetail/EventContent';
import ErrorAlert from '../../components/ui/ErrorAlert';
import Button from './../../components/ui/Button';
import Head from 'next/head';

export default function PreviewEventPage({ event: eventProp }) {
	const event = eventProp;

	if (event === undefined) {
		return <p className='center'>Loading...</p>;
	}

	return (
		<>
			<Head>
				<title>{event.title ?? 'Event'}</title>
				<meta
					name='description'
					content={
						event
							? event.description
							: 'Find a lot of great events that allow you to evolve'
					}
				/>
			</Head>
			{event !== null ? (
				<>
					<EventSummary title={event.title} />
					<EventLogistics event={event} />
					<EventContent>
						<p>{event.description}</p>
					</EventContent>
				</>
			) : (
				<div className='center'>
					<ErrorAlert>
						<p>No event found!</p>
					</ErrorAlert>
					<Button link='/events'>Show All Events</Button>
				</div>
			)}
		</>
	);
}

export async function getStaticProps(context) {
	const eventId = context.params.eventId;
	console.log('EVENT ID ', eventId);
	const event = await getEventById(eventId);
	const props = { event };
	return { props, revalidate: 30 };
}

export async function getStaticPaths() {
	const featuredIds = await getFeaturedEventsIds();
	const paths = featuredIds.map((id) => ({ params: { eventId: id } }));
	return { paths, fallback: 'blocking' };
}
