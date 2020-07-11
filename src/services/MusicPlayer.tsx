import React from 'react';
import { usePlayingMusic } from '../contexts/playing-music';

const MusicPlayer = () => {
	const { musicURL } = usePlayingMusic();
	const audioRef = React.useRef<HTMLAudioElement>();

	React.useEffect(() => {
		audioRef.current = new Audio()
	}, []);

	React.useEffect(() => {
		if (!audioRef.current) throw new Error('Synchronization error, audioElement was not created');
		if (musicURL) {
			audioRef.current.src = musicURL;
			audioRef.current.load();
			audioRef.current.play();
		} else {
			audioRef.current.src = '';
			audioRef.current.pause();
		}
	}, [musicURL, audioRef.current]);

	return null;
}

export default MusicPlayer;