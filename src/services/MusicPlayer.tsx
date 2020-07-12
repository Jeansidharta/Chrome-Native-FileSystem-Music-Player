import React from 'react';
import { usePlayingMusic } from '../contexts/playing-music';

const MusicPlayer = () => {
	const { musicURL, musicStatus } = usePlayingMusic();
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

	React.useEffect(() => {
		if (!audioRef.current) return;

		if (musicStatus.playing) audioRef.current.play();
		else audioRef.current.pause();

		audioRef.current.volume = musicStatus.volume;
	}, [musicStatus]);

	return null;
}

export default MusicPlayer;