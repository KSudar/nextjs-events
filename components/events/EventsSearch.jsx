import { useRef } from 'react';
import styles from './EventsSearch.module.css';
import Button from './../ui/Button';
function EventsSearch({ onSearch }) {
	const yearRef = useRef();
	const monthRef = useRef();
	const months = [
		'Siječanj',
		'Veljača',
		'Ožujak',
		'Travanj',
		'Svibanj',
		'Lipanj',
		'Srpanj',
		'Kolovoz',
		'Rujan',
		'Listopad',
		'Studeni',
		'Prosinac',
	];
	function handleSubmit(event) {
		event.preventDefault();

		const selectedYear = yearRef.current.value;
		const selectedMonth = monthRef.current.value;
		onSearch(selectedYear, selectedMonth);
	}
	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.controls}>
				<div className={styles.control}>
					<label htmlFor='year'>Year</label>
					<select id='year' ref={yearRef}>
						{Array.from(
							{ length: 10 },
							(_, i) => i + new Date().getFullYear()
						).map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>
				<div className={styles.control}>
					<label htmlFor='month'>Month</label>
					<select id='month' ref={monthRef}>
						{months.map((month, index) => (
							<option key={index} value={index + 1}>
								{month}
							</option>
						))}
					</select>
				</div>
			</div>
			<Button>Find Events</Button>
		</form>
	);
}

export default EventsSearch;
