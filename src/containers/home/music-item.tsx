import React from 'react';
import styled from 'styled-components';
import { usePlayingMusic } from '../../contexts/playing-music';

const Root = styled.div`
	border: 1px solid rgba(0, 0, 0, 0.3);
	padding: 8px 16px;
	margin: 2px 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
`;

const MusicName = styled.p`
	margin: 0;
`;

type MusicItemProps = {
	musicFileHandler: FileSystemFileHandle,
}

type MusicItemComponent = React.FunctionComponent<MusicItemProps>;

const MusicItem: MusicItemComponent = ({ musicFileHandler }) => {
	const { play } = usePlayingMusic();

	async function handleClick () {
		const file = await musicFileHandler.getFile();
		play(file);
	}

	return (
		<Root onClick={handleClick}>
			<MusicName>{musicFileHandler.name}</MusicName>
		</Root>
	);
}

export default MusicItem;