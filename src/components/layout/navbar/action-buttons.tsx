import React from 'react';
import styled from 'styled-components';
import { usePlayingMusic } from '../../../contexts/playing-music';
import useShortcutModal from '../../modals/shortcuts-modal';

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
	box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
	border-radius: 8px;
	padding: 4px 8px;
	font-size: 12px;
	transition: 200ms;
	outline: none;
	margin: 0 8px;
	:hover, :focus {
		box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.1);
		transform: scale(1.1);
	}
	:active {
		box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.4);
		transform: scale(0.9);
	}
`;

type ActionButtonsProps = React.PropsWithoutRef<{}>;
type ActionButtonsComponent = React.FunctionComponent<ActionButtonsProps>;

const ActionButtons: ActionButtonsComponent = () => {
	const { requestLoadDirectory } = usePlayingMusic();
	const openShortcutModal = useShortcutModal();

	return (
		<Root>
			<Button onClick={openShortcutModal}>Shortcuts</Button>
			<Button onClick={requestLoadDirectory}>Add files<br/>from folder</Button>
		</Root>
	);
}

export default ActionButtons;