import React from 'react';

type PlayingMusicContext = {
	play: (file: File) => void,
	musicURL: string | null,
	pause: () => void,
	resume: () => void,
	setVolume: (newVolume: number) => void,
	musicStatus: MusicStatusState,
}

type MusicStatusState = {
	playing: boolean,
	volume: number,
};

const defaulMusicStatus: MusicStatusState = {
	playing: true,
	volume: 1,
};

const playingMusicContext = React.createContext<PlayingMusicContext>(null as any);

const MAX_VOLUME = 1;
const MIN_VOLUME = 0;

export function PlayingMusicProvider ({ ...props }) {
	const [musicURL, setMusicURL] = React.useState<string | null>(null);
	const [musicStatus, setMusicStatus] = React.useState<MusicStatusState>(defaulMusicStatus);

	function play (file: File) {
		if (musicURL) URL.revokeObjectURL(musicURL);
		const url = URL.createObjectURL(file);
		setMusicURL(url);
	}

	function pause () {
		setMusicStatus({ ...musicStatus, playing: false });
	}

	function resume () {
		setMusicStatus({ ...musicStatus, playing: true });
	}

	function setVolume (newVolume: number) {
		setMusicStatus({
			...musicStatus,
			volume: Math.max(MIN_VOLUME, Math.min(MAX_VOLUME, newVolume)),
		});
	}

	return (
		<playingMusicContext.Provider {...props} value={{
			play,
			pause,
			resume,
			setVolume,
			musicStatus,
			musicURL,
		}} />
	);
}

export function usePlayingMusic () {
	return React.useContext(playingMusicContext);
}