import React from 'react';
import { LocalMusicEntry, YoutubeEntry, MusicEntry } from '../models/music';
import { openDirectory } from '../libs/file-helpers';
import { toast } from 'react-toastify';
import { fetchRelevantVideoInfo } from '../libs/youtube-video-info';

type PlayingMusicContext = {
	pause: () => void,
	resume: () => void,
	musicStatus: MusicStatusState,
	play: (music: MusicEntry) => void,
	playNext: () => void,
	playPrevious: () => void,
	currentlyPlaying: MusicEntry | null,
	requestLoadDirectory: () => Promise<void>,
	updateMusicDuration: (music: MusicEntry, duration: number) => void,
	loadMusicFromHyperlink: (link: string) => void,
	allMusic: MusicEntry[],
}

type MusicStatusState = {
	playing: boolean,
	currentlyPlaying: null | MusicEntry,
};

const defaultMusicStatus: MusicStatusState = {
	playing: false,
	currentlyPlaying: null,
}

const playingMusicContext = React.createContext<PlayingMusicContext>(null as any);

export function PlayingMusicProvider ({ ...props }) {
	const [allMusic, setAllMusic] = React.useState<MusicEntry[]>([]);
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

		const musicEntries = files.map((file, index) => ({
			file,
			duration: null,
			id: index.toString(),
			name: file.name,
		}));

		setDir(dir);
		setAllMusic(musicEntries.filter(e => e) as LocalMusicEntry[]);
	}

	async function loadMusicFromHyperlink (link: string) {
		let url: URL;
		try {
			url = new URL(link);
		} catch (e) {
			console.error(e);
			toast.error('Whoops, it seems this is not a valid link!');
			return;
		}
		if (url.hostname !== 'www.youtube.com') {
			toast.error('Sorry, but I can only work with Youtube links');
			return;
		}
		if (url.pathname !== '/watch') {
			toast.error('You must give me the link of a Youtube video.');
			return;
		}
		const videoId = url.searchParams.get('v');
		if (!videoId) {
			toast.error(`I could not identify what video you are watching... Make sure your URL has the '?v=somelargestring' thing in it`);
			return;
		}
		if (findMusicById(videoId)) {
			toast.error(`It seem this music has already been added. In this case, I will not be adding a duplicate.`);
			return;
		}
		const info = await fetchRelevantVideoInfo(videoId);

		const music: YoutubeEntry = {
			id: videoId,
			duration: info.duration,
			audioStreams: info.streammingFormats,
			name: info.name,
		};

		setAllMusic(state => [...state, music]);
	}

	function pause () {
		setMusicStatus({ ...musicStatus, playing: false });
	}

	function resume () {
		setMusicStatus({ ...musicStatus, playing: true });
	}

	function play (currentlyPlaying: MusicEntry) {
		setMusicStatus({ ...musicStatus, currentlyPlaying, playing: true });
	}

	function findMusicIndex (music: MusicEntry) {
		return allMusic.findIndex(f => f.id === music.id);
	}

	function findMusicById (id: string) {
		return allMusic.find(f => f.id === id);
	}

	function playNext () {
		const { currentlyPlaying } = musicStatus;
		let nextMusic: MusicEntry;
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
		let prevMusic: MusicEntry;
		if (!currentlyPlaying) return false;
		const prevIndex = findMusicIndex(currentlyPlaying) - 1;
		if (prevIndex < 0) return false;
		prevMusic = allMusic[prevIndex];
		setMusicStatus({ ...musicStatus, currentlyPlaying: prevMusic });
		return true;
	}

	function updateMusicDuration (music: MusicEntry, duration: number) {
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
			loadMusicFromHyperlink,
		}} />
	);
}

export function usePlayingMusic () {
	return React.useContext(playingMusicContext);
}