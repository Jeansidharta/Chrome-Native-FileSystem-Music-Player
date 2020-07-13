import React from 'react';

import { FileSystemProvider } from './file-system';
import { PlayingMusicProvider } from './playing-music';
import { VolumeProvider } from './volume';
import { SortFilterProvider } from './sort-filter';

type ProvidersProps = React.PropsWithChildren<{}>;

type ProvidersComponent = React.FunctionComponent<ProvidersProps>;

const Providers: ProvidersComponent = ({ children }) => {
	return (
		<FileSystemProvider>
			<PlayingMusicProvider>
				<VolumeProvider>
					<SortFilterProvider>
						{children}
					</SortFilterProvider>
				</VolumeProvider>
			</PlayingMusicProvider>
		</FileSystemProvider>
	);
}

export default Providers;