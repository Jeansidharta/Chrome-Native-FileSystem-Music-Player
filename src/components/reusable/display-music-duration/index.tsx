import React from 'react';
import { MusicEntry, isLocalMusicEntry } from '../../../models/music';
import Spinner from '../spinner';
import findMusicDuration from '../../../libs/find-music-duration';

type DisplayMusicDurationProps = React.PropsWithoutRef<{
	music: MusicEntry,
}>;

type DisplayMusicDurationComponent = React.FunctionComponent<DisplayMusicDurationProps>;

const DisplayMusicDuration: DisplayMusicDurationComponent = ({ music }) => {
	const [duration, setDuration] = React.useState(music.duration);

	React.useEffect(() => {
		if (music.duration) return;
		if (!isLocalMusicEntry(music)) return;
		findMusicDuration(music.file).then(duration => {
			music.duration = duration;
			setDuration(duration);
		}).catch(e => e);
	}, [music.duration]);

	if (typeof duration !== 'number') return <Spinner size={15} />;
	const totalSeconds = Math.floor(duration);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor(totalSeconds / 60) % 60;
	const seconds = totalSeconds % 60;
	let text = `${seconds}s`;
	if (minutes) text = `${minutes}m ${text}`
	if (hours) text = `${hours}m ${text}`
	return <>{text}</>
}

export default DisplayMusicDuration;