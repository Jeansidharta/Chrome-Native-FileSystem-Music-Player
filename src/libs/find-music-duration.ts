const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

let executionsHappening = 0;
const MAX_CONCURRENT_EXECUTIONS = 10;

async function findMusicDuration (file: File) {
	return new Promise<number>(async (resolve, reject) => {
		while(executionsHappening >= MAX_CONCURRENT_EXECUTIONS) await sleep(100);
		executionsHappening ++;

		const url = URL.createObjectURL(file);
		const audioElem = new Audio(url);
		audioElem.load();
		audioElem.addEventListener('error', () => {
			URL.revokeObjectURL(url);
			reject(new Error(`Unable to read file '${file.name}' (are you sure it's a music?). File will be removed from music list.`));
			executionsHappening--;
		});
		audioElem.addEventListener('loadeddata', () => {
			URL.revokeObjectURL(url);
			resolve(audioElem.duration);
			executionsHappening--;
		});
	});
}

export default findMusicDuration;