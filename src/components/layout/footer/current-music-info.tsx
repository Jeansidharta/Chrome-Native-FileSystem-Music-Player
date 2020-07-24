import React from 'react';
import styled from 'styled-components';
import { usePlayingMusic } from '../../../contexts/playing-music';

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
		const musicName = currentlyPlaying?.name || 'Nothing playing';
		return (
			<MusicName>{musicName}</MusicName>
		);
	}

	return (
		<Root>
			{renderCurrentMusicInfo()}
		</Root>
	);
}

export default CurrentMusicInfo;