import React from 'react';
import styled, { css } from 'styled-components';
import IconButton from '../../../reusable/IconButton';
import Images from '../../../../constants/images';
import { MusicEntry } from '../../../../models/music';
import AddFolder from './add-folder';
import AddFile from './add-file';
import AddYoutube from './add-youtube';

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

const TabElementContainer= styled.div`
	min-height: 100px;
	width: 100%;
	margin: 8px 0;
	padding: 8px;
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
	const [currentTab, setCurrentTab] = React.useState<'folder' | 'file' | 'youtube' | null>(null);

	const tabElement = {
		'folder': <AddFolder onNewItems={onNewItems} />,
		'file': <AddFile onNewItems={onNewItems} />,
		'youtube': <AddYoutube onNewItems={onNewItems} />,
		'null': <></>,
	}[currentTab || 'null'];

	return (
		<Root>
			<ButtonsContainer>
				<IconButton
					size='large'
					actionDescription='Add a single file'
					icon={<AddFileIcon />}
					onClick={() => setCurrentTab('file')}
				/>
				<IconButton
					size='large'
					actionDescription='Add an entire folder'
					icon={<AddFolderIcon />}
					onClick={() => setCurrentTab('folder')}
				/>
				<IconButton
					size='large'
					actionDescription='Add a youtube video'
					icon={<AddFromYoutubeIcon />}
					onClick={() => setCurrentTab('youtube')}
				/>
			</ButtonsContainer>
			<TabElementContainer>
				{tabElement}
			</TabElementContainer>
		</Root>
	);
}

export default ActionButtons;