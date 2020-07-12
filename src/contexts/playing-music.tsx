import React from 'react';

type PlayingMusicContext = {
	play: (file: File) => void,
	pause: () => void,
	resume: () => void,
	musicStatus: MusicStatusState,
}

type MusicStatusState = {
	musicURL: string | null,
	playing: boolean,
};

const defaultMusicStatus: MusicStatusState = {
	musicURL: null,
	playing: true,
}

const playingMusicContext = React.createContext<PlayingMusicContext>(null as any);

export function PlayingMusicProvider ({ ...props }) {
	const [musicStatus, setMusicStatus] = React.useState<MusicStatusState>(defaultMusicStatus);

	function play (file: File) {
		if (musicStatus.musicURL) URL.revokeObjectURL(musicStatus.musicURL);
		const musicURL = URL.createObjectURL(file);
		setMusicStatus({ ...musicStatus, musicURL });
	}

	function pause () {
		setMusicStatus({ ...musicStatus, playing: false });
	}

	function resume () {
		setMusicStatus({ ...musicStatus, playing: true });
	}

	return (
		<playingMusicContext.Provider {...props} value={{
			play,
			pause,
			resume,
			musicStatus,
		}} />
	);
}

export function usePlayingMusic () {
	return React.useContext(playingMusicContext);
}