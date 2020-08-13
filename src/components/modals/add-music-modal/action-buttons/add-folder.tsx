import React from 'react';
import styled from 'styled-components';
import { openDirectoryAsMusicEntries } from '../../../../libs/file-helpers';
import OutlineButton from '../../../reusable/outline-button';
import { MusicEntry } from '../../../../models/music';

const AddFolderButton = styled(OutlineButton)`
`;

type AddFolderProps = React.PropsWithoutRef<{
	onNewItems: (newItems: MusicEntry[]) => void,
}>;

type AddFolderComponent = React.FunctionComponent<AddFolderProps>;

const AddFolder: AddFolderComponent = ({ onNewItems }) => {
	async function handleAddFolderClick () {
		const entries = await openDirectoryAsMusicEntries();
		if (!entries) return;
		onNewItems(entries);
	}

	return (
		<AddFolderButton
			actionDescription='Add whole folder contents'
			onClick={handleAddFolderClick}
		>
			Pick Folder
		</AddFolderButton>
	);
}

export default AddFolder;