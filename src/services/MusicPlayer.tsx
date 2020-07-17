import React from 'react';
import { usePlayingMusic } from '../contexts/playing-music';
import { useVolume } from '../contexts/volume';

const MusicPlayer = () => {
	const { musicStatus: { currentlyPlaying, playing }, playNextInQueue } = usePlayingMusic();
	const { volume } = useVolume();
	const [musicURL, setMusicURL] = React.useState<string | null>(null);
	const audioRef = React.useRef<HTMLAudioElement>(null);

	async function updateURL () {
		if (!currentlyPlaying) return;
		const audioElement = audioRef.current as HTMLAudioElement;

		const newURL = URL.createObjectURL(currentlyPlaying.file);
		audioElement.src = newURL;
		audioElement.load();

		if (musicURL) URL.revokeObjectURL(musicURL);
		setMusicURL(newURL);
	}

	React.useEffect(() => {
		function nextSong () {
			playNextInQueue();
		}

		audioRef.current?.addEventListener('ended', nextSong);
		return () => audioRef.current?.removeEventListener('ended', nextSong);
	}, [playNextInQueue]);

	React.useEffect(() => { updateURL() }, [currentlyPlaying]);

	React.useEffect(() => {
		if (!musicURL) return;
		const audioElement = audioRef.current as HTMLAudioElement;

		if (playing) {
			audioElement.play();
			audioElement.volume = volume;
		} else {
			audioElement.pause();
		}
	}, [playing, volume, musicURL]);

	return <audio ref={audioRef} />;
}

export default MusicPlayer;