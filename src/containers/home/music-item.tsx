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
	musicFile: File,
	onClick?: (event: React.MouseEvent<HTMLDivElement>) => void,
}

type MusicItemComponent = React.FunctionComponent<MusicItemProps>;

const MusicItem: MusicItemComponent = ({ musicFile, onClick }) => {
	const { currentlyPlaying } = usePlayingMusic();

	const isSame = currentlyPlaying?.file.name === musicFile.name;

	return (
		<Root onClick={onClick} isSame={isSame}>
			<MusicName>{musicFile.name}</MusicName>
		</Root>
	);
}

export default MusicItem;