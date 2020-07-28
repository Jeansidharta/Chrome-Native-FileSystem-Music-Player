import React from 'react';
import styled, { css } from 'styled-components';
import IconButton from '../../reusable/IconButton';
import Images from '../../../constants/images';
import { openDirectoryAsMusicEntries } from '../../../libs/file-helpers';
import { makeMusicEntryFromURL } from '../../../libs/youtube-video-info';
import { toast } from 'react-toastify';
import { MusicEntry } from '../../../models/music';

const Root = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 8px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const MusicForm = styled.form`
`;

const MusicInput = styled.input.attrs(() => ({ type: 'text' }))`
	width: 100%;
	margin-top: 8px;
	border-radius: 4px;
	padding: 4px 8px;
`;

const IconCss = css`
`;

const AddFileIcon = styled(Images.Icons.AddFile).attrs(() => ({ css: IconCss }))`
`;

const AddFolderIcon = styled(Images.Icons.AddFolder).attrs(() => ({ css: IconCss }))`
`;

const AddFromYoutubeIcon = styled(Images.Icons.AddFromYoutube).attrs(() => ({ css: IconCss }))`
`;

type ActionButtonsProps = React.PropsWithoutRef<{
	onNewItems: (newItems: MusicEntry[]) => void,
}>;

type ActionButtonsComponent = React.FunctionComponent<ActionButtonsProps>;

const ActionButtons: ActionButtonsComponent = ({ onNewItems }) => {

	async function handleAddFolderClick () {
		const entries = await openDirectoryAsMusicEntries();
		if (!entries) return;
		onNewItems(entries);
	}

	async function handleAddYoutubeClick () {
	}

	function submitNewYoutubeMusic (event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const inputElem = (event.target as HTMLFormElement)['music-url'] as HTMLInputElement;
		const link = inputElem.value;
		try {
			const entry = makeMusicEntryFromURL(link);
			onNewItems([entry]);
		} catch (e) {
			toast.error(e.message);
		}
	}

	return (
		<Root>
			<ButtonsContainer>
				<IconButton
					size='large'
					actionDescription='Add a single file'
					icon={<AddFileIcon />}
				/>
				<IconButton
					size='large'
					actionDescription='Add an entire folder'
					icon={<AddFolderIcon />}
					onClick={handleAddFolderClick}
				/>
				<IconButton
					size='large'
					actionDescription='Add a youtube video'
					icon={<AddFromYoutubeIcon />}
					onClick={handleAddYoutubeClick}
				/>
			</ButtonsContainer>
			<MusicForm onSubmit={submitNewYoutubeMusic}>
				<MusicInput name='music-url' title="Youtube's video URL" />
			</MusicForm>
		</Root>
	);
}

export default ActionButtons;