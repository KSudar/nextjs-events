import { getFilteredEvents } from '../../helpers/ApiUtil';
import EventList from './../../components/events/EventList';
import ResultsTitle from './../../components/events/ResultsTitle';
import Button from './../../components/ui/Button';
import ErrorAlert from './../../components/ui/ErrorAlert';
import Head from 'next/head';

function FilteredEvents({ hasError, filteredEvents, filter }) {
	const pageHeadData = (title, description) => (
		<Head>
			<title>{title}</title>
			<meta name='description' content={description ?? title} />
		</Head>
	);
	if (hasError) {
		return (
			<div className='center'>
				{pageHeadData('Error')}
				<ErrorAlert>
					<p>Invalid Filters. Please adjust your values!</p>
				</ErrorAlert>
				<Button link='/events'>Show All Events</Button>
			</div>
		);
	}

	if (filteredEvents === undefined) {
		return (
			<>
				{pageHeadData('Loading')}
				<p className='center'>Loading...</p>;
			</>
		);
	}

	const dateForTitle = new Date(filter.year, filter.month - 1);

	return (
		<>
			{pageHeadData(
				'Filtered Events',
				`All events for ${filter.year}/${filter.month}`
			)}
			<ResultsTitle date={dateForTitle}></ResultsTitle>
			{filteredEvents.length ? (
				<EventList events={filteredEvents} />
			) : (
				<ErrorAlert>
					<p className='center'>No events to display!</p>
				</ErrorAlert>
			)}
		</>
	);
}

export async function getServerSideProps({ params }) {
	const [yearString, monthString] = params.filter;
	const year = Number(yearString);
	const month = Number(monthString);
	const props = {};
	if (
		isNaN(year) ||
		isNaN(month) ||
		year < new Date().getFullYear() ||
		month < 1 ||
		month > 12
	) {
		props.hasError = true;
	} else {
		props.filter = { year, month };
		props.filteredEvents = await getFilteredEvents(props.filter);
	}
	return { props };
}

export default FilteredEvents;
