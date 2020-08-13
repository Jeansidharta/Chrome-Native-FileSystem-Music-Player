import React from 'react';
import styled from 'styled-components';
import { MusicEntry } from '../../../../models/music';
import { openFileAsMusicEntry } from '../../../../libs/file-helpers';
import OutlineButton from '../../../reusable/outline-button';

const AddFolderButton = styled(OutlineButton)`
`;

type AddFileProps = React.PropsWithoutRef<{
	onNewItems: (newItems: MusicEntry[]) => void,
}>;

type AddFileComponent = React.FunctionComponent<AddFileProps>;

const AddFile: AddFileComponent = ({ onNewItems }) => {
	async function handleAddFolderClick () {
		const entry = await openFileAsMusicEntry();
		if (!entry) return;
		onNewItems([entry]);
	}

	return (
		<AddFolderButton
			actionDescription='Add whole folder contents'
			onClick={handleAddFolderClick}
		>
			Pick File
		</AddFolderButton>
	);
}

export default AddFile;