import React from 'react';
import { LocalMusicEntry } from '../models';
import { openDirectory } from '../libs/file-helpers';

type PlayingMusicContext = {
	pause: () => void,
	resume: () => void,
	musicStatus: MusicStatusState,
	play: (music: LocalMusicEntry) => void,
	playNext: () => void,
	playPrevious: () => void,
	currentlyPlaying: LocalMusicEntry | null,
	requestLoadDirectory: () => Promise<void>,
	updateMusicDuration: (music: LocalMusicEntry, duration: number) => void,
	allMusic: LocalMusicEntry[],
}

type MusicStatusState = {
	playing: boolean,
	currentlyPlaying: null | LocalMusicEntry,
};

const defaultMusicStatus: MusicStatusState = {
	playing: false,
	currentlyPlaying: null,
}

const playingMusicContext = React.createContext<PlayingMusicContext>(null as any);

export function PlayingMusicProvider ({ ...props }) {
	const [allMusic, setAllMusic] = React.useState<LocalMusicEntry[]>([]);
	const [musicStatus, setMusicStatus] = React.useState<MusicStatusState>(defaultMusicStatus);

	// DO NOT REMOVE THIS
	// This is related to a bug in chrome. See this repo: https://github.com/Jeansidharta/chrome-bug-report---native-file-system-api
	const setDir = React.useState<FileSystemDirectoryHandle | null>(null)[1];

	async function requestLoadDirectory () {
		const dir = await openDirectory().catch(e => console.error(e));
		if (!dir) return;

		const promises: Promise<File>[] = [];
		for await(const file of dir.getEntries()) {
			promises.push(file.getFile());
		}
		const files = await Promise.all(promises);

		const musicEntries = files.map(file => ({ file, duration: null }));

		setDir(dir);
		setAllMusic(musicEntries.filter(e => e) as LocalMusicEntry[]);
	}

	function pause () {
		setMusicStatus({ ...musicStatus, playing: false });
	}

	function resume () {
		setMusicStatus({ ...musicStatus, playing: true });
	}

	function play (currentlyPlaying: LocalMusicEntry) {
		setMusicStatus({ ...musicStatus, currentlyPlaying, playing: true });
	}

	function findMusicIndex (music: LocalMusicEntry) {
		return allMusic.findIndex(f => f.file === music.file);
	}

	function playNext () {
		const { currentlyPlaying } = musicStatus;
		let nextMusic: LocalMusicEntry;
		if (!currentlyPlaying) {
			nextMusic = allMusic[0];
		} else {
			const nextIndex = findMusicIndex(currentlyPlaying) + 1;
			if (nextIndex >= allMusic.length) return false;
			nextMusic = allMusic[nextIndex];
		}
		setMusicStatus({ ...musicStatus, currentlyPlaying: nextMusic });
		return true;
	}

	function playPrevious () {
		const { currentlyPlaying } = musicStatus;
		let prevMusic: LocalMusicEntry;
		if (!currentlyPlaying) return false;
		const prevIndex = findMusicIndex(currentlyPlaying) - 1;
		if (prevIndex < 0) return false;
		prevMusic = allMusic[prevIndex];
		setMusicStatus({ ...musicStatus, currentlyPlaying: prevMusic });
		return true;
	}

	function updateMusicDuration (music: LocalMusicEntry, duration: number) {
		const musicIndex = findMusicIndex(music);
		const newAllMusic = [...allMusic];
		newAllMusic[musicIndex] = { ...music, duration };
		setAllMusic(newAllMusic);
	}

	return (
		<playingMusicContext.Provider {...props} value={{
			pause,
			resume,
			musicStatus,
			play,
			playNext,
			playPrevious,
			requestLoadDirectory,
			allMusic,
			updateMusicDuration,
			currentlyPlaying: musicStatus.currentlyPlaying,
		}} />
	);
}

export function usePlayingMusic () {
	return React.useContext(playingMusicContext);
}