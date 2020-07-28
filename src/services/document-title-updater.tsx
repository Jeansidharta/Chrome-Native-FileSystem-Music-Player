import React from 'react';

import { usePlayingMusic } from '../contexts/playing-music';

const DocumentTitleUpdater = () => {
	const { currentlyPlaying } = usePlayingMusic();

	React.useEffect(() => {
		if (!currentlyPlaying) {
			document.title = 'Music';
		} else {
			const name = currentlyPlaying?.name;
			if (typeof name === 'string') document.title = name;
			else if (name instanceof Promise) name.then(newName => document.title = newName);
		}
	}, [currentlyPlaying]);

	return null;
}

export default DocumentTitleUpdater;