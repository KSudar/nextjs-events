import Image from 'next/image';
import AddressIcon from '../icons/AddressIcon';
import DateIcon from '../icons/DateIcon';
import LogisticsItem from './LogisticsItem';
import styles from './EventLogistics.module.css';

function EventLogistics({ event }) {
	const humanReadableDate = new Date(event.date).toLocaleDateString('hr-HR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
	const addressText = event.location.replace(', ', '\n');

	return (
		<section className={styles.logistics}>
			<div className={styles.image}>
				<Image src={event.image} alt={event.title} width={400} height={400} />
			</div>
			<ul className={styles.list}>
				<LogisticsItem icon={DateIcon}>
					<time>{humanReadableDate}</time>
				</LogisticsItem>
				<LogisticsItem icon={AddressIcon}>
					<address>{addressText}</address>
				</LogisticsItem>
			</ul>
		</section>
	);
}

export default EventLogistics;
