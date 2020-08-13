import React from 'react';
import styled, { css } from 'styled-components';
import Images from '../../../constants/images';
import IconButton from '../../reusable/IconButton';

const Root = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	padding: 8px;
`;

const Name = styled.p`
	margin: 0;
	overflow-x: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	width: 100%;
`;

const iconsCss = css`
	width: 24px;
	height: 24px;
	margin-left: 8px;
`;

const YoutubeIcon = styled(Images.Icons.YoutubePlayButton).attrs(() => ({ css: iconsCss }))``;
const FileIcon = styled(Images.Icons.File).attrs(() => ({ css: iconsCss }))``;
const CloseIcon = styled(Images.Icons.Trash).attrs(() => ({ css: iconsCss }))`
	width: 16px;
	height: 16px;
`;

type MusicModalItemProps = React.PropsWithoutRef<{
	name: string,
	origin: 'local' | 'youtube',
	onDelete?: () => void,
}>;

type MusicModalItemComponent = React.FunctionComponent<MusicModalItemProps>;

const MusicModalItem: MusicModalItemComponent = ({ name, origin, onDelete }) => {
	return (
		<Root title={name}>
			<Name>{name}</Name>
			{ origin === 'local'
				? <FileIcon title='Originated from your local files' />
				: <YoutubeIcon title='Originated from youtube' /> }
			<IconButton
				onClick={onDelete}
				icon={<CloseIcon />}
				actionDescription='Remove file'
			/>
		</Root>
	);
}

export default MusicModalItem;