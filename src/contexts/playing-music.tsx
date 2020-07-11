import React from 'react';

type PlayingMusicContext = {
	play: (file: File) => void,
	musicURL: string | null,
}

const playingMusicContext = React.createContext<PlayingMusicContext>(null as any);


export function PlayingMusicProvider ({ ...props }) {
	const [musicURL, setMusicURL] = React.useState<string | null>(null);

	function play (file: File) {
		if (musicURL) URL.revokeObjectURL(musicURL);
		const url = URL.createObjectURL(file);
		setMusicURL(url);
	}

	return (
		<playingMusicContext.Provider {...props} value={{
			play,
			musicURL
		}} />
	);
}

export function usePlayingMusic () {
	return React.useContext(playingMusicContext);
}