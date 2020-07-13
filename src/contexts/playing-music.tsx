import React from 'react';

type PlayingMusicContext = {
	pause: () => void,
	resume: () => void,
	musicStatus: MusicStatusState,
	setQueue: (queue: FileSystemFileHandle[], playAfter: boolean) => void,
	addToQueue: (music: FileSystemFileHandle) => void,
	playNextInQueue: () => void,
	playPreviousInQueue: () => void,
	currentlyPlaying: CurrentMusicInfo | null,
}

type CurrentMusicInfo = {
	fileHandle: FileSystemFileHandle,
	queueIndex: number,
}

type MusicStatusState = {
	playing: boolean,
	queue: FileSystemFileHandle[],
	currentlyPlaying: null | CurrentMusicInfo,
};

const defaultMusicStatus: MusicStatusState = {
	playing: false,
	queue: [],
	currentlyPlaying: null,
}

const playingMusicContext = React.createContext<PlayingMusicContext>(null as any);

export function PlayingMusicProvider ({ ...props }) {
	const [musicStatus, setMusicStatus] = React.useState<MusicStatusState>(defaultMusicStatus);

	function pause () {
		setMusicStatus({ ...musicStatus, playing: false });
	}

	function resume () {
		setMusicStatus({ ...musicStatus, playing: true });
	}

	function setQueue (queue: FileSystemFileHandle[], playAfter: boolean = false) {
		let currentlyPlaying;
		if (queue.length === 0) currentlyPlaying = null;
		else currentlyPlaying = {
			fileHandle: queue[0],
			queueIndex: 0,
		};
		setMusicStatus({ ...musicStatus, queue, currentlyPlaying, playing: playAfter });
	}

	function addToQueue (music: FileSystemFileHandle) {
		const newQueue = [...musicStatus.queue, music];
		setMusicStatus({ ...musicStatus, queue: newQueue });
	}

	function playNextInQueue () {
		const { queue, currentlyPlaying } = musicStatus;
		let nextMusic: CurrentMusicInfo;
		if (!currentlyPlaying) {
			if (queue.length === 0) return false;
			nextMusic = { fileHandle: queue[0], queueIndex: 0 };
		} else {
			const nextIndex = currentlyPlaying.queueIndex + 1;
			if (nextIndex >= queue.length) return false;
			nextMusic = { fileHandle: queue[nextIndex], queueIndex: nextIndex };
		}
		setMusicStatus({ ...musicStatus, currentlyPlaying: nextMusic });
		return true;
	}

	function playPreviousInQueue () {
		const { queue, currentlyPlaying } = musicStatus;
		let prevMusic: CurrentMusicInfo;
		if (!currentlyPlaying) return false;
		const prevIndex = currentlyPlaying.queueIndex - 1;
		if (prevIndex < 0) return false;
		prevMusic = { fileHandle: queue[prevIndex], queueIndex: prevIndex };
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
			currentlyPlaying: musicStatus.currentlyPlaying,
		}} />
	);
}

export function usePlayingMusic () {
	return React.useContext(playingMusicContext);
}