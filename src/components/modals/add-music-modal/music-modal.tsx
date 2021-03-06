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
	max-height: 80vh;
`;

const ModalItemsContainer= styled.div`
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
			const handleDelete = () => {
				const newEntries = [...entries];
				newEntries.splice(index, 1);
				setEntries(newEntries);
			}

			if (isYoutubeEntry(item)) {
				return <MusicModalItem
					onDelete={handleDelete}
					name={item.id}
					origin='youtube'
					key={index}
				/>;
			} else if (isLocalMusicEntry(item)) {
				return <MusicModalItem
					onDelete={handleDelete}
					name={item.name}
					origin='local'
					key={index}
				/>;
			} else return null;
		});
	}

	const disabled = entries.length === 0;

	const stopPastePropagation = (elem: HTMLElement | null) => {
		if (!elem) return;
		elem.addEventListener('paste', event => event.stopPropagation());
	}

	return (
		<Root ref={stopPastePropagation}>
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