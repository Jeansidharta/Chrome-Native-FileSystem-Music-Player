import React from 'react';
import { usePlayingMusic } from '../contexts/playing-music';
import { useMusicTimestamp } from '../contexts/music-timestamp';
import { useVolume } from '../contexts/volume';

type ShortcutsProps = React.PropsWithoutRef<{}>;
type ShortcutsComponent = React.FunctionComponent<ShortcutsProps>;

const Shortcuts: ShortcutsComponent = () => {
	const { resume, pause, musicStatus, playNext, playPrevious } = usePlayingMusic();
	const { setTimestamp, getTimestamp } = useMusicTimestamp();
	const { updateVolume, volume } = useVolume();

	function handleHeyDown (event: KeyboardEvent) {
		const key = event.key.toLowerCase();
		if (key === 'k') {
			if (musicStatus.playing) pause();
			else resume();
		} else if (key === 'arrowright') {
			const time = getTimestamp();
			if (!time) return;
			setTimestamp(time + 5);
		} else if (key === 'arrowleft') {
			const time = getTimestamp();
			if (!time) return;
			setTimestamp(time - 5);
		} else if (key === 'l') {
			const time = getTimestamp();
			if (!time) return;
			setTimestamp(time + 15);
		} else if (key === 'j') {
			const time = getTimestamp();
			if (!time) return;
			setTimestamp(time - 15);
		} else if (key === 'n') {
			playNext();
		} else if (key === 'p') {
			playPrevious();
		} else if (key === 'arrowup') {
			updateVolume(volume + 0.1);
		} else if (key === 'arrowdown') {
			updateVolume(volume - 0.1);
		}
	}

	React.useEffect(() => {
		document.body.addEventListener('keydown', handleHeyDown);
		return () => document.body.removeEventListener('keydown', handleHeyDown);
	}, [musicStatus, volume]);

	return null;
}

export default Shortcuts;