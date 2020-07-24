import React from 'react';
import { usePlayingMusic } from '../contexts/playing-music';
import { useVolume } from '../contexts/volume';
import { useMusicTimestamp } from '../contexts/music-timestamp';
import { isLocalMusicEntry, isYoutubeEntry } from '../models/music';

const MusicPlayer = () => {
	const {
		musicStatus: { currentlyPlaying, playing },
		playNext,
	} = usePlayingMusic();
	const { setAudioElemRef } = useMusicTimestamp();
	const { volume } = useVolume();
	const [musicURL, setMusicURL] = React.useState<string | null>(null);
	const audioRef = React.useRef<HTMLAudioElement>(null);

	React.useEffect(() => setAudioElemRef(audioRef), []);

	async function updateURL () {
		const audioElement = audioRef.current as HTMLAudioElement;

		if (isLocalMusicEntry(currentlyPlaying)) {
			const newURL = URL.createObjectURL(currentlyPlaying.file);
			audioElement.src = newURL;
			audioElement.load();
			if (musicURL) URL.revokeObjectURL(musicURL);
			setMusicURL(newURL);
		} else if (isYoutubeEntry(currentlyPlaying)) {
			const streams = currentlyPlaying.audioStreams;
			const newURL = streams[streams.length - 1].url;
			audioElement.src = newURL;
			audioElement.load();
			if (musicURL) URL.revokeObjectURL(musicURL);
			setMusicURL(null);
		}
	}

	React.useEffect(() => {
		function nextSong () {
			playNext();
		}

		audioRef.current?.addEventListener('ended', nextSong);
		return () => audioRef.current?.removeEventListener('ended', nextSong);
	}, [playNext]);

	React.useEffect(() => { updateURL() }, [currentlyPlaying]);

	React.useEffect(() => {
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