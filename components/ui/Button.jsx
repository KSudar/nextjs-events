import Link from 'next/link';
import styles from './Button.module.scss';

function Button({ link, children, onClick }) {
	return (
		<>
			{link ? (
				<Link href={link}>
					<a className={styles.btn}>{children}</a>
				</Link>
			) : (
				<button className={styles.btn} onClick={onClick}>
					{children}
				</button>
			)}
		</>
	);
}

export default Button;
