import styles from './ErrorAlert.module.scss';

function ErrorAlert({ children }) {
	return <div className={styles.alert}>{children}</div>;
}

export default ErrorAlert;
