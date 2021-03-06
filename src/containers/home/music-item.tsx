import React from 'react';
import styled from 'styled-components';
import { usePlayingMusic } from '../../contexts/playing-music';
import { MusicEntry } from '../../models/music';
import DisplayMusicDuration from '../../components/reusable/display-music-duration';
import DisplayMusicName from '../../components/reusable/display-music-name';

const Root = styled.div`
	border: 1px solid rgba(0, 0, 0, 0.3);
	padding: 8px 16px;
	margin: 2px 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	cursor: pointer;
	${(props: { isSame: boolean }) => props.isSame ? `
		background-color: palegreen;
	` : `
	`}
`;

const MusicDuration = styled.div`
	opacity: 0.5;
	font-size: 14px;
`;

const MusicName = styled.p`
	margin: 0;
`;

type MusicItemProps = {
	music: MusicEntry,
	onClick?: (event: React.MouseEvent<HTMLDivElement>) => void,
}

type MusicItemComponent = React.FunctionComponent<MusicItemProps>;

const MusicItem: MusicItemComponent = ({ music, onClick }) => {
	const { currentlyPlaying } = usePlayingMusic();

	const isSame = currentlyPlaying?.name === music.name;

	return (
		<Root onClick={onClick} isSame={isSame}>
			<MusicName>
				<DisplayMusicName music={music} />
			</MusicName>
			<MusicDuration>
				<DisplayMusicDuration music={music} />
			</MusicDuration>
		</Root>
	);
}

export default MusicItem;