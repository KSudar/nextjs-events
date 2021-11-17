import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Head>
				<title>Events Page</title>
				<meta name='description' content='Events' />
				<meta name='viewport' content='inital-scale=1.0, width=device-width' />
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;