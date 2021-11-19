import Head from 'next/head';
import Link from 'next/link';

import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../helpers/ApiUtil';
import NewsletterRegistration from './../components/input/NewsletterRegistration';

function HomePage({ featuredEvents }) {
	return (
		<div>
			<Head>
				<title>NextJS Events</title>
				<meta
					name='description'
					content='Find a lot of great events that allow you to evolve'
				/>
			</Head>
			<NewsletterRegistration />
			<EventList events={featuredEvents} />
		</div>
	);
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();
	const props = {
		featuredEvents,
	};
	return { props, revalidate: 1800 };
}

export default HomePage;
