export interface MusicEntry {
	id: string,
	duration: number | null,
}

export interface YoutubeEntry extends MusicEntry {
	duration: number,
	youtubeId: string,
}

export interface LocalMusicEntry extends MusicEntry {
	file: File,
}