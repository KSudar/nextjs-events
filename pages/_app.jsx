import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.scss';
import { NotificationContextProvider } from './../store/NotificationContext';

function MyApp({ Component, pageProps }) {
	return (
		<NotificationContextProvider>
			<Layout>
				<Head>
					<title>Events Page</title>
					<meta name='description' content='Events' />
					<meta
						name='viewport'
						content='inital-scale=1.0, width=device-width'
					/>
				</Head>
				<Component {...pageProps} />
			</Layout>
		</NotificationContextProvider>
	);
}

export default MyApp;
