import React from 'react';

type AudioElemRef = React.RefObject<HTMLAudioElement> | null;

type MusicTimestampContext = {
	getTimestamp: () => number | null,
	setTimestamp: (timestamp: number) => void,
	setAudioElemRef: (ref: AudioElemRef) => void,
};

const MusicTimestampContext = React.createContext<MusicTimestampContext>(null as any);

export function MusicTimestampProvider ({ ...props }) {
	const [audioElemRef, setAudioElemRef] = React.useState<AudioElemRef>(null);

	function getTimestamp () {
		const time = audioElemRef?.current?.currentTime;
		if (typeof time !== 'number') return null;
		return time;
	}

	function setTimestamp (timestamp: number) {
		if (!audioElemRef?.current) return;
		audioElemRef.current.currentTime = timestamp;
	}

	return (
		<MusicTimestampContext.Provider {...props} value={{
			getTimestamp,
			setTimestamp,
			setAudioElemRef,
		}} />
	);
}

export function useMusicTimestamp () {
	return React.useContext(MusicTimestampContext);
}