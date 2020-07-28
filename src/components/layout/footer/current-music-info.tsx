import React from 'react';
import styled from 'styled-components';
import { usePlayingMusic } from '../../../contexts/playing-music';
import DisplayMusicName from '../../reusable/display-music-name';

const Root = styled.div`
`;

const MusicName = styled.p`
	margin: 0;
	padding: 8px 0;
`;

type CurrentMusicInfoProps = React.PropsWithoutRef<{}>;
type CurrentMusicInfoComponent = React.FunctionComponent<CurrentMusicInfoProps>;

const CurrentMusicInfo: CurrentMusicInfoComponent = () => {
	const { musicStatus: { currentlyPlaying } } = usePlayingMusic();

	function renderCurrentMusicInfo () {
		return (
			<MusicName>
				{ currentlyPlaying
					? <DisplayMusicName music={currentlyPlaying} />
					: 'Nothing playing'
				}
			</MusicName>
		);
	}

	return (
		<Root>
			{renderCurrentMusicInfo()}
		</Root>
	);
}

export default CurrentMusicInfo;