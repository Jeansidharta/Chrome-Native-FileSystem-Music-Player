import { AdaptiveFormat } from "./api/youtube-info";

export interface MusicEntry {
	id: string | Promise<string>,
	/** Measured in seconds */
	duration: number | Promise<number>,
	name: string,
}

export interface YoutubeEntry extends MusicEntry {
	duration: number,
	audioStreams: AdaptiveFormat[],
	id: string,
}

export interface LocalMusicEntry extends MusicEntry {
	file: File,
}

export function isYoutubeEntry (entry?: null | MusicEntry | YoutubeEntry): entry is YoutubeEntry {
	return Boolean(entry) && Boolean((entry as any).audioStreams);
}

export function isLocalMusicEntry (entry?: null | MusicEntry | LocalMusicEntry): entry is LocalMusicEntry {
	return Boolean(entry) && Boolean((entry as any).file);
}