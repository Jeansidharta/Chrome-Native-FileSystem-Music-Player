// Framework
import React from 'react';
import Head from 'next/head';

// Libs
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Services
import MusicPlayer from '../services/music-player';
import ModalRenderer from '../services/modal-renderer';
import DocumentTitleUpdater from '../services/document-title-updater';
import Shortcuts from '../services/shortcuts';
import DragAndDrop from '../services/drag-and-drop';

// Layout components
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';

// Misc
import Providers from '../contexts';
import LinkPasting from '../services/link-pasting';
import FilledThemeProvider from '../theme';

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
					* {
						box-sizing: border-box;
					}
				`}</style>
			</Head>

			<ToastContainer hideProgressBar />
			<FilledThemeProvider>
				<Providers>
					<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
						<Navbar />
						<div style={{ height: '100%', overflowY: 'auto' }}>
							<Component {...pageProps} />
						</div>
						<Footer />
					</div>
					<MusicPlayer />
					<ModalRenderer />
					<DocumentTitleUpdater />
					<Shortcuts />
					<DragAndDrop />
					<LinkPasting />
				</Providers>
			</FilledThemeProvider>
		</>
	);
}

export default MyApp