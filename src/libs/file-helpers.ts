export async function openDirectory () {
	const handle = await window.chooseFileSystemEntries({ type: 'open-directory' });
	return handle;
}