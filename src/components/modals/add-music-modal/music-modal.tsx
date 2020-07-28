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
	min-height: 100px;
`;

const SubmitButtonsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 4px 0 0 0;
`;

const CancelButton = styled(OutlineButton)`
	margin: 0 4px;
`;

const SubmitButton = styled(OutlineButton)`
	margin: 0 4px;
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

	function handleCancelClick () {
		clearModal();
	}

	function renderModalItems () {
		return entries.map((item, index) => {
			if (isYoutubeEntry(item)) {
				return <MusicModalItem name='teste' origin='youtube' key={index} />;
			} else if (isLocalMusicEntry(item)) {
				return <MusicModalItem name={item.name} origin='local' key={index} />;
			} else return null;
		});
	}

	const disabled = entries.length === 0;

	return (
		<Root>
			<ActionButtons onNewItems={handleNewSources} />
			<ModalItemsContainer>
				{renderModalItems()}
			</ModalItemsContainer>
			<SubmitButtonsContainer>
				<CancelButton
					actionDescription='Closes modal without adding any music'
					onClick={handleCancelClick}
				>
					Cancel
				</CancelButton>
				<SubmitButton
					onClick={handleSubmit}
					scaleOffset={0.05}
					disabled={disabled}
					actionDescription={entries.length === 0 ? 'You must have entries to add' : 'Add all entries to musics list'}
				>
					Add
				</SubmitButton>
			</SubmitButtonsContainer>
		</Root>
	);
}

export default AddMusicModal;