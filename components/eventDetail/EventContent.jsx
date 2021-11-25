import styles from './EventContent.module.scss';

function EventContent({ children }) {
	return <section className={styles.content}>{children}</section>;
}

export default EventContent;
