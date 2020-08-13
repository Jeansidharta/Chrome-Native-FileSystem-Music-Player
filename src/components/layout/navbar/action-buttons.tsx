import React from 'react';
import styled from 'styled-components';
import useShortcutModal from '../../modals/shortcuts-modal';
import useAddMusicModal from '../../modals/add-music-modal';

const Root = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
`;

const Button = styled.button`
	cursor: pointer;
	background-color: transparent;
	border: none;
	box-shadow: ${props => props.theme.shadows.small.normal};
	border-radius: 8px;
	padding: 4px 8px;
	font-size: 12px;
	transition: 200ms;
	outline: none;
	margin: 0 8px;
	:hover, :focus {
		box-shadow: ${props => props.theme.shadows.small.hover};
		transform: scale(1.1);
	}
	:active {
		box-shadow: ${props => props.theme.shadows.small.active};
		transform: scale(0.9);
	}
`;

type ActionButtonsProps = React.PropsWithoutRef<{}>;
type ActionButtonsComponent = React.FunctionComponent<ActionButtonsProps>;

const ActionButtons: ActionButtonsComponent = () => {
	const openShortcutModal = useShortcutModal();
	const openAddMusicModal = useAddMusicModal();

	return (
		<Root>
			<Button onClick={openShortcutModal}>Shortcuts</Button>
			<Button onClick={() => openAddMusicModal()}>Add files<br/>from folder</Button>
		</Root>
	);
}

export default ActionButtons;