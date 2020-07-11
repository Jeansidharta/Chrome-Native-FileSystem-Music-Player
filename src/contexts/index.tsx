import React from 'react';

import { FileSystemProvider } from './file-system';
import { PlayingMusicProvider } from './playing-music';

type ProvidersProps = React.PropsWithChildren<{}>;

type ProvidersComponent = React.FunctionComponent<ProvidersProps>;

const Providers: ProvidersComponent = ({ children }) => {
	return (
		<FileSystemProvider>
			<PlayingMusicProvider>
				{children}
			</PlayingMusicProvider>
		</FileSystemProvider>
	);
}

export default Providers;