import React from 'react';
import { usePlayingMusic } from '../contexts/playing-music';
import { useVolume } from '../contexts/volume';
import { toast } from 'react-toastify';

const MusicPlayer = () => {
	const { musicStatus: { currentlyPlaying, playing }, playNextInQueue } = usePlayingMusic();
	const { volume } = useVolume();
	const [musicURL, setMusicURL] = React.useState<string | null>(null);
	const audioRef = React.useRef<HTMLAudioElement>(null);

	async function tryToGetPermissionBack (fileHandler: FileSystemFileHandle) {
		const perm = await fileHandler.queryPermission();
		if (perm === 'denied') {
			toast.error('Whoops! Seems like I don\'t have permission to open this file, and can\'t even ask for it. Something must be broken');
		} else if (perm === 'prompt') {
			const newPerm = await fileHandler.requestPermission();
			if (newPerm === 'prompt') {
				toast.warn('Without permission, I can\'t open this file');
			} else if (newPerm === 'granted') {
				return true;
			}
		} else {
			toast.error('Huh, I do have permission to open this file. Some other thing must\'ve gone wrong.');
		}
		return false;
	}

	async function openFile (fileHandle: FileSystemFileHandle) {
		try {
			const file = fileHandle.getFile();
			return file;
		} catch (e) {
			console.error(e);
			const couldGetPermissionBack = await tryToGetPermissionBack(fileHandle);

			// Try again
			if (couldGetPermissionBack) {
				const file = await fileHandle.getFile();
				return file;
			} else {
				return null;
			}
		};
	}

	async function updateURL () {
		if (!currentlyPlaying) return;
		const audioElement = audioRef.current as HTMLAudioElement;
		const file = await openFile(currentlyPlaying.handler);
		if (!file) return;

		const newURL = URL.createObjectURL(file);
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