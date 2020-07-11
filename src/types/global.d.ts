/*
* These types were created using the 64 bits version of chrome 83.0.4103.116
* This is a very new and unstable API, so it might be cause for future changes or
* rewrites. It's most official docs are currently held here:
* https://wicg.github.io/native-file-system/#api-filesystemfilehandle
*
* This text is being written at 2020-07-12
*/

// [Exposed=(Window,Worker), SecureContext, Serializable]
declare interface FileSystemHandle {
	readonly name: string;

	// Specified in documentation, but not included in chrome
	// readonly kind: 'file' | 'directory';

	// Not specified in documentation, but included in chrome
	readonly isFile: boolean;
	readonly isDirectory: boolean;

	isSameEntry(other: FileSystemHandle): Promise<boolean>;

	queryPermission(descriptor?: { writable: bool }): Promise<PermissionState>;
	requestPermission(descriptor?: { writable: bool }): Promise<PermissionState>;
};


// [Exposed=(Window,Worker), SecureContext, Serializable]
declare interface FileSystemFileHandle extends FileSystemHandle {
	getFile(): Promise<File>,
	createWritable(options?: { keepExistingData: bool }): Promise<FileSystemWritableFileStream>,
	readonly isDirectory: false,
	readonly isFile: true,
};

declare interface NativeFileSystemDirectoryIterator {
	next(): Promise<{ done: boolean, value: FileSystemFileHandle }>,
}

// [Exposed=(Window,Worker), SecureContext, Serializable]
interface FileSystemDirectoryHandle extends FileSystemHandle {
	// These are not specified in the documentation, but are available on chrome
	getDirectory(directoryName): Promise<FileSystemDirectoryHandle>,
	getEntries(): {[Symbol.asyncIterator](): NativeFileSystemDirectoryIterator},
	getFile(fileName: string): Promise<FileSystemFileHandle>,

	// These are specified in the specs, but not currently implemented on chrome.
	// getFileHandle(name: string, options?: { create: boolean }): Promise<FileSystemFileHandle>,
	// getDirectoryHandle(name: string, options?: { create: boolean }): Promise<FileSystemDirectoryHandle>,
	// async iterable<USVString, FileSystemHandle>;

	removeEntry(name: string, options?: { recursive: boolean }): Promise<void>,
	resolve(possibleDescendant: FileSystemHandle): Promise<sequence<string>?>,
	readonly isDirectory: true,
	readonly isFile: false,
};

declare interface WriteParams {
	type: 'write' | 'seek' | 'truncate';
	size?: number;
	position?: number;
	data?: Buffer | Blob | string;
};

type FileSystemWriteChunkType = Buffer | Blob | string | WriteParams;

// [Exposed=(Window,Worker), SecureContext]
interface FileSystemWritableFileStream extends WritableStream {
	write(data: FileSystemWriteChunkType ): Promise<void>;
	seek(position: number ): Promise<void>;
	truncate(size: number ): Promise<void>;
};

declare type FileSystemEntryType = 'open-directory' | 'sandbox' | 'save-file'

declare interface ChooseFileSystemEntriesOptions<T extends FileSystemEntryType> {
	type: T;
	accepts?: {
		/** @example 'Text files' */
		description: string,
		/** @example ['txt', 'js'] */
		extensions: string[],
		/** @example ['text/plain', 'application/json'] */
		mimeTypes: string[],
	}[],
}

declare function chooseFileSystemEntries<T extends FileSystemEntryType>
	(opts?: ChooseFileSystemEntriesOptions<T>):
	T extends 'open-directory' ? FileSystemDirectoryHandle :
	T extends 'save-file'? FileSystemFileHandle :
	FileSystemHandle;