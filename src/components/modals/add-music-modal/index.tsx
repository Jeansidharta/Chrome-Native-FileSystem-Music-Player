import React from 'react';
import { useModal } from '../../../contexts/modal';
import AddMusicModal from './music-modal';
import { MusicEntry } from '../../../models/music';

const useAddMusicModal = () => {
	const { openModal } = useModal();

	return (initialItems: MusicEntry[] = []) => {
		return openModal(<AddMusicModal initialItems={initialItems} />);
	};
}

export default useAddMusicModal;