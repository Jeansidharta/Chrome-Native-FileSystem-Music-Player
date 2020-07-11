import React from 'react';

type FileSystemContext = {
	setFileSystem: React.Dispatch<React.SetStateAction<FileSystemState | null>>,
	fileSystem: FileSystemState | null,
}

const fileSystemContext = React.createContext<FileSystemContext>(null as any);

type FileSystemState = {
	directory: FileSystemDirectoryHandle,
	music: FileSystemFileHandle[],
}

export function FileSystemProvider ({ ...props }) {
	const [fileSystem, setFileSystem] = React.useState<FileSystemState | null>(null);

	return (
		<fileSystemContext.Provider {...props} value={{
			setFileSystem,
			fileSystem
		}} />
	);
}

export function useFileSystem () {
	return React.useContext(fileSystemContext);
}