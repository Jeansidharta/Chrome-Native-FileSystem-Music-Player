import React from 'react';

import { usePlayingMusic } from '../contexts/playing-music';

const DocumentTitleUpdater = () => {
	const { currentlyPlaying } = usePlayingMusic();

	React.useEffect(() => {
		if (!currentlyPlaying) {
			document.title = 'Music';
		} else {
			document.title = currentlyPlaying?.handler.name;
		}
	}, [currentlyPlaying]);

	return null;
}

export default DocumentTitleUpdater;