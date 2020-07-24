import React from 'react';
import { usePlayingMusic } from '../contexts/playing-music';

type LinkPastingProps = React.PropsWithoutRef<{}>;
type LinkPastingComponent = React.FunctionComponent<LinkPastingProps>;

function promisifiedGetItemText (item: DataTransferItem) {
	return new Promise(resolve => item.getAsString(resolve));
}

const LinkPasting: LinkPastingComponent = () => {
	const { loadMusicFromHyperlink } = usePlayingMusic();

	React.useEffect(() => {
		function handlePaste (event: ClipboardEvent) {
			if (!event.clipboardData) return;
			const data = event.clipboardData;
			[...data.items].forEach(async item => {
				if (item.type === 'text/plain') {
					loadMusicFromHyperlink((await promisifiedGetItemText(item)) as string);
				}
			});
		}

		document.body.addEventListener('paste', handlePaste);
		return () => document.body.removeEventListener('paste', handlePaste);
	}, [loadMusicFromHyperlink]);

	return null;
}

export default LinkPasting;