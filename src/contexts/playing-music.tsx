import React from 'react';
import { MusicEntry, YoutubeEntry } from '../models/music';
import { toast } from 'react-toastify';
import { makeMusicEntryFromURL } from '../libs/youtube-video-info';

type PlayingMusicContext = {
	pause: () => void,
	resume: () => void,
	musicStatus: MusicStatusState,
	play: (music: MusicEntry) => void,
	playNext: () => void,
	playPrevious: () => void,
	currentlyPlaying: MusicEntry | null,
	addMusicEntries: (entries: MusicEntry[]) => void,
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

	/** Removes an entry from the `allMusic` list. It'll use the entry's ID to identify it */
	function removeEntry(entry: MusicEntry) {
		setAllMusic(state => {
			const index = state.findIndex(stateMusic => entry.id === stateMusic.id);
			if (index === -1) {
				console.warn('Warning: removeEntry could not find an entry to remove. This is probably a bug in  your code');
				return state;
			}
			const newState = [...state];
			newState.splice(index, 1);
			return newState;
		});
	}

	async function addMusicEntries (entries: MusicEntry[]) {
		// Calculates the duration of all music files
		entries.forEach(async entry => {
			try {
				if (typeof entry.duration === 'function') {
					await entry.duration();
				}
				if (typeof entry.name === 'function') await entry.name().catch(() => {
					throw new Error(`Unable to read music name. Entry will be removed from music list.`);
				});
			} catch (e) {
				console.error(e);
				toast.error(e.message);
				removeEntry(entry);
			}
		});

		setAllMusic([...allMusic, ...entries]);
	}

	async function loadMusicFromHyperlink (link: string) {
		let entry: YoutubeEntry;
		try {
			entry = makeMusicEntryFromURL(link);
		} catch (e) {
			toast.error(e.message);
			return;
		}

		if (findMusicById(entry.id)) {
			toast.error(`It seem this music has already been added. In this case, I will not be adding a duplicate.`);
			return;
		}

		function handleError (error: Error) {
			console.error(error);
			toast.error(error.message);
			removeEntry(entry);
		}

		if (typeof entry.audioStreams === 'function') entry.audioStreams().catch(handleError);
		if (typeof entry.name === 'function') entry.name().catch(handleError);
		if (typeof entry.duration === 'function') entry.duration().catch(handleError);

		setAllMusic(state => [...state, entry]);
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

	return (
		<playingMusicContext.Provider {...props} value={{
			pause,
			resume,
			musicStatus,
			play,
			playNext,
			playPrevious,
			addMusicEntries,
			allMusic,
			currentlyPlaying: musicStatus.currentlyPlaying,
			loadMusicFromHyperlink,
		}} />
	);
}

export function usePlayingMusic () {
	return React.useContext(playingMusicContext);
}