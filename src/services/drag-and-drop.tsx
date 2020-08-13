import React from 'react';
import { usePlayingMusic } from '../contexts/playing-music';

type DragAndDropProps = React.PropsWithoutRef<{}>;
type DragAndDropComponent = React.FunctionComponent<DragAndDropProps>;

function promisifiedGetItemText (item: DataTransferItem) {
	return new Promise(resolve => item.getAsString(resolve));
}

function prevetDefault (event: Event) {
	event.preventDefault();
}

const DragAndDrop: DragAndDropComponent = () => {
	const { loadMusicFromHyperlink } = usePlayingMusic();

	React.useEffect(() => {
		function handleDrop (event: DragEvent) {
			event.preventDefault();
			const dataTransfer = event.dataTransfer;
			if (!dataTransfer) throw new Error('No datatransfer. Wut');

			[...dataTransfer.items].forEach(async item => {
				if (item.type === 'text/uri-list') {
					loadMusicFromHyperlink((await promisifiedGetItemText(item)) as string);
				}
			});
		}

		document.body.addEventListener('drop', handleDrop);
		return () => document.body.removeEventListener('drop', handleDrop);
	}, [loadMusicFromHyperlink]);

	// Prevents the browser from openning a new tab when dropping files
	React.useEffect(() => {
		document.body.addEventListener('dragover', prevetDefault);
		return () => document.body.removeEventListener('dragover', prevetDefault);
	}, []);

	return null;
}

export default DragAndDrop;