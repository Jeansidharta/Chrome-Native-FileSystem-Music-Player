import React from 'react';
import styled from 'styled-components';
import { MusicEntry } from '../../../../models/music';
import { toast } from 'react-toastify';
import { makeMusicEntryFromURL } from '../../../../libs/youtube-video-info';
import OutlineButton from '../../../reusable/outline-button';

const MusicForm = styled.form`
	margin-top: 8px;
	display: flex;
	align-items: center;
	height: 20px;
`;

const MusicInput = styled.input.attrs(() => ({ type: 'text' }))`
	border-radius: 4px;
	padding: 4px 8px;
	border: 1px solid black;
	height: 100%;
`;

const MusicSubmitButton = styled(OutlineButton)`
	margin: 0 4px;
`;

type AddYoutubeProps = React.PropsWithoutRef<{
	onNewItems: (newItems: MusicEntry[]) => void,
}>;

type AddYoutubeComponent = React.FunctionComponent<AddYoutubeProps>;

const AddYoutube: AddYoutubeComponent = ({ onNewItems }) => {
	const [isButtonDisable, setIsButtonDisabled] = React.useState<boolean>(true);

	function submitNewYoutubeMusic (event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const inputElem = (event.target as HTMLFormElement)['music-url'] as HTMLInputElement;
		const link = inputElem.value;
		try {
			const entry = makeMusicEntryFromURL(link);
			onNewItems([entry]);
		} catch (e) {
			toast.error(e.message);
		}
	}

	function handleInputChange (event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value) setIsButtonDisabled(false);
		else setIsButtonDisabled(true);
	}

	return (
		<MusicForm onSubmit={submitNewYoutubeMusic}>
			<MusicInput
				name='music-url'
				title="Youtube's video URL"
				onChange={handleInputChange}
			/>
			<MusicSubmitButton
				actionDescription='Add a youtube music to the list'
				disabled={isButtonDisable}
			>Add</MusicSubmitButton>
		</MusicForm>
	);
}

export default AddYoutube;