import React from 'react';

type VolumeContext = {
	updateVolume: (newVolume: number) => void,
	volume: number,
}

const volumeContext = React.createContext<VolumeContext>(null as any);

const MAX_VOLUME = 1;
const MIN_VOLUME = 0;

export function VolumeProvider ({ ...props }) {
	const [volume, setVolume] = React.useState<number>(1);

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