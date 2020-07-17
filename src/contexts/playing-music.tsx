import React from 'react';
import { MusicEntry } from '../models';
import { openDirectory } from '../libs/file-helpers';

type PlayingMusicContext = {
	pause: () => void,
	resume: () => void,
	musicStatus: MusicStatusState,
	setQueue: (queue: File[], playAfter: boolean) => void,
	addToQueue: (music: File) => void,
	playNextInQueue: () => void,
	playPreviousInQueue: () => void,
	currentlyPlaying: MusicEntry | null,
	requestLoadDirectory: () => Promise<void>,
	allMusic: File[],
}

type MusicStatusState = {
	playing: boolean,
	queue: File[],
	currentlyPlaying: null | MusicEntry,
};

const defaultMusicStatus: MusicStatusState = {
	playing: false,
	queue: [],
	currentlyPlaying: null,
}

const playingMusicContext = React.createContext<PlayingMusicContext>(null as any);

export function PlayingMusicProvider ({ ...props }) {
	const [allMusic, setAllMusic] = React.useState<File[]>([]);
	const [musicStatus, setMusicStatus] = React.useState<MusicStatusState>(defaultMusicStatus);

	// DO NOT REMOVE THIS
	// This is related to a bug in chrome. See this repo: https://github.com/Jeansidharta/chrome-bug-report---native-file-system-api
	const [_, setDir] = React.useState<FileSystemDirectoryHandle | null>(null);

	async function requestLoadDirectory () {
		const dir = await openDirectory().catch(e => console.error(e));
		if (!dir) return;

		const promises: Promise<File>[] = [];
		for await(const file of dir.getEntries()) {
			promises.push(file.getFile());
		}
		const music = await Promise.all(promises);

		setDir(dir);
		setAllMusic(music);
	}

	function pause () {
		setMusicStatus({ ...musicStatus, playing: false });
	}

	function resume () {
		setMusicStatus({ ...musicStatus, playing: true });
	}

	function setQueue (queue: File[], playAfter: boolean = false) {
		let currentlyPlaying;
		if (queue.length === 0) currentlyPlaying = null;
		else currentlyPlaying = {
			file: queue[0],
			queueIndex: 0,
		};
		setMusicStatus({ ...musicStatus, queue, currentlyPlaying, playing: playAfter });
	}

	function addToQueue (music: File) {
		const newQueue = [...musicStatus.queue, music];
		setMusicStatus({ ...musicStatus, queue: newQueue });
	}

	function playNextInQueue () {
		const { queue, currentlyPlaying } = musicStatus;
		let nextMusic: MusicEntry;
		if (!currentlyPlaying) {
			if (queue.length === 0) return false;
			nextMusic = { file: queue[0], queueIndex: 0 };
		} else {
			const nextIndex = currentlyPlaying.queueIndex! + 1;
			if (nextIndex >= queue.length) return false;
			nextMusic = { file: queue[nextIndex], queueIndex: nextIndex };
		}
		setMusicStatus({ ...musicStatus, currentlyPlaying: nextMusic });
		return true;
	}

	function playPreviousInQueue () {
		const { queue, currentlyPlaying } = musicStatus;
		let prevMusic: MusicEntry;
		if (!currentlyPlaying) return false;
		const prevIndex = currentlyPlaying.queueIndex! - 1;
		if (prevIndex < 0) return false;
		prevMusic = { file: queue[prevIndex], queueIndex: prevIndex };
		setMusicStatus({ ...musicStatus, currentlyPlaying: prevMusic });
		return true;
	}

	return (
		<playingMusicContext.Provider {...props} value={{
			pause,
			resume,
			musicStatus,
			setQueue,
			addToQueue,
			playNextInQueue,
			playPreviousInQueue,
			requestLoadDirectory,
			allMusic,
			currentlyPlaying: musicStatus.currentlyPlaying,
		}} />
	);
}

export function usePlayingMusic () {
	return React.useContext(playingMusicContext);
}