import React from 'react';
import styled from 'styled-components';
import { useModal } from '../../../contexts/modal';
import ShortcutItem from './shortcut-item';

const Root = styled.div`
`;

const useShortcutModal = () => {
	const { openModal } = useModal();

	// TODO - centrilize shortcuts in a single file, and pull the from there

	return () => openModal(
		<Root>
			<ShortcutItem shortcutText='k' description='Play/Pause music' />
			<ShortcutItem shortcutText='Arrow Right' description='Jumps 5 seconds forward in music' />
			<ShortcutItem shortcutText='Arrow Left' description='Jumps 5 seconds backward in music' />
			<ShortcutItem shortcutText='l' description='Jumps 15 seconds forward in music' />
			<ShortcutItem shortcutText='j' description='Jumps 15 seconds backward in music' />
			<ShortcutItem shortcutText='n' description='Plays next music' />
			<ShortcutItem shortcutText='p' description='Plays previous music' />
			<ShortcutItem shortcutText='Arrow Up' description='Increase volume by 10%' />
			<ShortcutItem shortcutText='Arrow Down' description='Decrease volume by 10%' />
		</Root>
	);
}

export default useShortcutModal;