import Image from 'next/image';
import Button from '../ui/Button';
import styles from './EventItem.module.css';
import DateIcon from '../icons/DateIcon';
import AddressIcon from '../icons/AddressIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';

function EventItem({ event }) {
	const humanReadableDate = new Date(event.date).toLocaleDateString('hr-HR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
	const formattedAddress = event.location.replace(', ', '\n');
	const exploreLink = `/events/${event.id}`;

	return (
		<li className={styles.item}>
			<Image src={event.image} alt={event.title} width={250} height={160} />
			<div className={styles.content}>
				<div>
					<h2>{event.title}</h2>
					<div className={styles.date}>
						<DateIcon />
						<time>{humanReadableDate}</time>
					</div>
					<div className={styles.address}>
						<AddressIcon />
						<address>{formattedAddress}</address>
					</div>
				</div>
				<div className={styles.actions}>
					<Button link={exploreLink}>
						<span>Explore Event</span>
						<span className={styles.icon}>
							<ArrowRightIcon />
						</span>
					</Button>
				</div>
			</div>
		</li>
	);
}

export default EventItem;
