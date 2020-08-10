import { toast } from "react-toastify";
import findMusicDuration from "./find-music-duration";
import hashFile from "./file-hasher";
import { LocalMusicEntry } from "../models/music";

// DO NOT REMOVE THIS
// This is related to a bug in chrome. See this repo: https://github.com/Jeansidharta/chrome-bug-report---native-file-system-api
const previouslyOpenDirectories: FileSystemDirectoryHandle[] = [];

/**
* This is a function that will call Chrome's API directly, which will ask the user
* to select a directory, and return that directory's file handler
*/
async function openDirectory () {
	let promise;
	try {
		promise = window.chooseFileSystemEntries({ type: 'open-directory' })
	} catch (e) {
		toast.error('Whoops! Seems like I can\'t access the Native File System API. Make sure you\'re using Chrome and have enabled the "Native File System API" flag on chrome://flags');
		throw e;
	}
	const handle = await promise;
	previouslyOpenDirectories.push(handle);
	return handle;
}

/**
* This is a function that will call Chrome's API directly, which will ask the user
* to select a single file to be read.
*/
async function openFile () {
	let promise;
	try {
		promise = window.chooseFileSystemEntries()
	} catch (e) {
		toast.error('Whoops! Seems like I can\'t access the Native File System API. Make sure you\'re using Chrome and have enabled the "Native File System API" flag on chrome://flags');
		throw e;
	}
	const handle = await promise;
	return handle;
}

/**
* This will prompt the user to open a directory, and will return all files
* inside that directory
* @returns An array of files, or undefined if any errors occurred
*/
export async function openAndFetchAllDirectoryFiles () {
	const dir = await openDirectory().catch(e => console.error(e));
	if (!dir) return;

	const promises: Promise<File>[] = [];
	for await(const file of dir.getEntries()) {
		promises.push(file.getFile());
	}
	const files = await Promise.all(promises);
	return files;
}

export async function openDirectoryAsMusicEntries () {
	const files = await openAndFetchAllDirectoryFiles();
	if (!files) return;

	const musicEntries: LocalMusicEntry[] = files.map(file => {
		const entry: LocalMusicEntry = {
			file,
			duration: () => entry.duration = findMusicDuration(file).then(duration => entry.duration = duration),
			name: file.name,
			id: hashFile(file),
		};
		return entry;
	});

	return musicEntries;
}

export async function openFileAsMusicEntry () {
	const fileHandle = await openFile();
	const file = await fileHandle.getFile();

	const musicEntry: LocalMusicEntry = {
		file,
		duration: () => musicEntry.duration = findMusicDuration(file).then(duration => musicEntry.duration = duration),
		name: file.name,
		id: hashFile(file),
	};

	return musicEntry;
}