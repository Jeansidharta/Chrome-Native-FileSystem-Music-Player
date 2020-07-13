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
	${(props: { isSame: boolean }) => props.isSame ? `
		background-color: palegreen;
	` : `
	`}
`;

const MusicName = styled.p`
	margin: 0;
`;

type MusicItemProps = {
	musicFileHandler: FileSystemFileHandle,
	onClick?: (event: React.MouseEvent<HTMLDivElement>) => void,
}

type MusicItemComponent = React.FunctionComponent<MusicItemProps>;

const MusicItem: MusicItemComponent = ({ musicFileHandler, onClick }) => {
	const { currentlyPlaying } = usePlayingMusic();

	const isSame = currentlyPlaying?.fileHandle.name === musicFileHandler.name;

	return (
		<Root onClick={onClick} isSame={isSame}>
			<MusicName>{musicFileHandler.name}</MusicName>
		</Root>
	);
}

export default MusicItem;