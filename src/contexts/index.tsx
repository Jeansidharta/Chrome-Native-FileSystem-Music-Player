import React from 'react';

import { PlayingMusicProvider } from './playing-music';
import { VolumeProvider } from './volume';
import { ModalContextProvider } from './modal';
import { FilterProvider } from './filter';
import { SearchStringProvider } from './search-string';
import { SortProvider } from './sort';
import { MusicTimestampProvider } from './music-timestamp';

type ProvidersProps = React.PropsWithChildren<{}>;

type ProvidersComponent = React.FunctionComponent<ProvidersProps>;

const Providers: ProvidersComponent = ({ children }) => {
	return (
		<PlayingMusicProvider>
			<MusicTimestampProvider>
				<VolumeProvider>
					<FilterProvider>
						<SearchStringProvider>
							<SortProvider>
								<ModalContextProvider>
									{children}
								</ModalContextProvider>
							</SortProvider>
						</SearchStringProvider>
					</FilterProvider>
				</VolumeProvider>
			</MusicTimestampProvider>
		</PlayingMusicProvider>
	);
}

export default Providers;