import React from 'react';
import useUpdate from '../libs/hooks/useUpdate';

type VolumeContext = {
	updateVolume: (newVolume: number) => void,
	volume: number,
}

const volumeContext = React.createContext<VolumeContext>(null as any);

const MAX_VOLUME = 1;
const MIN_VOLUME = 0;

const LOCAL_STORAGE_KEY = 'Volume context';

type LocalStorageData = {
	volume: number;
};

export function VolumeProvider ({ ...props }) {
	const [volume, setVolume] = React.useState<number>(1);

	// Saves things to localstorage.
	useUpdate(() => {
		const data: LocalStorageData = { volume };
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
	}, [volume]);

	// Retrieves things from localstorage.
	React.useEffect(() => {
		const text = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!text) return;
		const data = JSON.parse(text) as LocalStorageData;
		setVolume(data.volume);
	}, []);

	function updateVolume (newVolume: number) {
		setVolume(Math.max(MIN_VOLUME, Math.min(MAX_VOLUME, newVolume)));
	}

	return (
		<volumeContext.Provider {...props} value={{
			updateVolume,
			volume,
		}} />
	);
}

export function useVolume () {
	return React.useContext(volumeContext);
}