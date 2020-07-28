import React from 'react';
import styled from 'styled-components';
import MusicModalItem from './music-modal-item';
import ActionButtons from './action-buttons';
import { MusicEntry, isYoutubeEntry, isLocalMusicEntry } from '../../../models/music';
import OutlineButton from '../../reusable/outline-button';
import { usePlayingMusic } from '../../../contexts/playing-music';
import { useModal } from '../../../contexts/modal';

const Root = styled.div`
	display: flex;
	flex-direction: column;
`;

const ModalItemsContainer= styled.div`
	max-height: 80vh;
	overflow-y: auto;
`;

const SubmitButton = styled(OutlineButton)`
	margin: 4px 0 4px auto;
`;

type AddMusicModalProps = React.PropsWithoutRef<{
	initialItems: MusicEntry[];
}>;

type AddMusicModalComponent = React.FunctionComponent<AddMusicModalProps>;

const AddMusicModal: AddMusicModalComponent = ({ initialItems }) => {
	const { clearModal } = useModal();
	const [entries, setEntries] = React.useState<MusicEntry[]>(initialItems || []);
	const { addMusicEntries } = usePlayingMusic();

	function handleNewSources (newSources: MusicEntry[]) {
		setEntries([...entries, ...newSources]);
	}

	function handleSubmit () {
		addMusicEntries(entries);
		clearModal();
	}

	function renderModalItems () {
		if (entries.length === 0) return <>Use the buttons above to add some songs!</>

		return entries.map((item, index) => {
			if (isYoutubeEntry(item)) {
				return <MusicModalItem name='teste' origin='youtube' key={index} />;
			} else if (isLocalMusicEntry(item)) {
				return <MusicModalItem name={item.name} origin='local' key={index} />;
			} else return null;
		});
	}

	return (
		<Root>
			<ActionButtons onNewItems={handleNewSources} />
			<ModalItemsContainer>
				{renderModalItems()}
			</ModalItemsContainer>
			{ entries.length > 0 &&
				<SubmitButton onClick={handleSubmit} scaleOffset={0.05}>ADD MUSIC</SubmitButton>
			}
		</Root>
	);
}

export default AddMusicModal;