import React from 'react';
import styled from 'styled-components';
import { usePlayingMusic } from '../../contexts/playing-music';
import { toast } from 'react-toastify';

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

	async function tryToGetPermissionBack (fileHandler: FileSystemFileHandle) {
		const perm = await fileHandler.queryPermission();
		if (perm === 'denied') {
			toast.error('Whoops! Seems like I don\'t have permission to open this file, and can\'t even ask for it. Something must be broken');
		} else if (perm === 'prompt') {
			const newPerm = await fileHandler.requestPermission();
			if (newPerm === 'prompt') {
				toast.warn('Without permission, I can\'t open this file');
			} else if (newPerm === 'granted') {
				return true;
			}
		} else {
			toast.error('Huh, I do have permission to open this file. Some other thing must\'ve gone wrong.');
		}
		return false;
	}

	async function openAndPlayMusic () {
		const file = await musicFileHandler.getFile();
		play(file);
	}

	async function handleClick () {
		try {
			await openAndPlayMusic();
		} catch (e) {
			console.error(e);
			const couldGetPermissionBack = await tryToGetPermissionBack(musicFileHandler);

			// Try again
			if (couldGetPermissionBack) handleClick();
		}
	}

	return React.useMemo(() => (
		<Root onClick={handleClick}>
			<MusicName>{musicFileHandler.name}</MusicName>
		</Root>
	), [play, musicFileHandler]);
}

export default MusicItem;