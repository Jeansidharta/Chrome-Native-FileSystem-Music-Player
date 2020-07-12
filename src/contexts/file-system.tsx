import React from 'react';
import { openDirectory } from '../libs/file-helpers';

type FileSystemContext = {
	requestDirectoryAccess: () => void,
	fileSystem: FileSystemState | null,
}

const fileSystemContext = React.createContext<FileSystemContext>(null as any);

type FileSystemState = {
	directory: FileSystemDirectoryHandle,
	music: FileSystemFileHandle[],
}

export function FileSystemProvider ({ ...props }) {
	const [fileSystem, setFileSystem] = React.useState<FileSystemState | null>(null);

	async function requestDirectoryAccess () {
		const dir = await openDirectory().catch(e => console.error(e));
		if (!dir) return;

		const files = [];
		for await(const file of dir.getEntries()) {
			files.push(file);
		}

		setFileSystem({ directory: dir, music: files });
	}

	return (
		<fileSystemContext.Provider {...props} value={{
			requestDirectoryAccess,
			fileSystem
		}} />
	);
}

export function useFileSystem () {
	return React.useContext(fileSystemContext);
}