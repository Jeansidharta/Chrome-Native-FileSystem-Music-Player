import React from 'react';

import { PlayingMusicProvider } from './playing-music';
import { VolumeProvider } from './volume';
import { ModalContextProvider } from './modal';
import { FilterProvider } from './filter';
import { SearchStringProvider } from './search-string';
import { SortProvider } from './sort';

type ProvidersProps = React.PropsWithChildren<{}>;

type ProvidersComponent = React.FunctionComponent<ProvidersProps>;

const Providers: ProvidersComponent = ({ children }) => {
	return (
		<PlayingMusicProvider>
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
		</PlayingMusicProvider>
	);
}

export default Providers;