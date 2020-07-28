import { AdaptiveFormat } from "./api/youtube-info";

type AsyncType<T> = T | Promise<T> | (() => Promise<T>);

export interface MusicEntry {
	id: string | Promise<string>,
	/** Measured in seconds */
	duration: AsyncType<number>,
	name: AsyncType<string>,
}

export interface YoutubeEntry extends MusicEntry {
	audioStreams: AsyncType<AdaptiveFormat[]>,
	id: string,
}

export interface LocalMusicEntry extends MusicEntry {
	file: File,
	name: string,
}

export function isYoutubeEntry (entry?: null | MusicEntry | YoutubeEntry): entry is YoutubeEntry {
	return Boolean(entry) && Boolean((entry as any).audioStreams);
}

export function isLocalMusicEntry (entry?: null | MusicEntry | LocalMusicEntry): entry is LocalMusicEntry {
	return Boolean(entry) && Boolean((entry as any).file);
}