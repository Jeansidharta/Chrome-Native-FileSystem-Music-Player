import { toast } from "react-toastify";

export async function openDirectory () {
	let promise;
	try {
		promise = window.chooseFileSystemEntries({ type: 'open-directory' })
	} catch (e) {
		toast.error('Whoops! Seems like I can\'t access the Native File System API. Make sure you\'re using Chrome and have enabled the "Native File System API" flag on chrome://flags');
		throw e;
	}
	const handle = await promise;
	return handle;
}