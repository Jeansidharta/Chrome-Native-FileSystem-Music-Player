import React from 'react';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import Navbar from '../components/layout/navbar';
import Providers from '../contexts';
import MusicPlayer from '../services/MusicPlayer';
import Footer from '../components/layout/footer';
import 'react-toastify/dist/ReactToastify.css';

type MyAppProps = React.PropsWithoutRef<{
	Component: any,
	pageProps: any,
}>;

type MyAppComponent = React.FunctionComponent<MyAppProps>;

const MyApp: MyAppComponent = ({ Component, pageProps }) => {
  return (
		<>
			<Head>
				<style>{`
					body, html, #__next {
						height: 100%;
						margin: 0;
					}
				`}</style>
			</Head>

			<ToastContainer hideProgressBar />
			<Providers>
				<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
					<Navbar />
					<div style={{ height: '100%' }}>
						<Component {...pageProps} />
					</div>
					<Footer />
				</div>
				<MusicPlayer />
			</Providers>
		</>
	);
}

export default MyApp