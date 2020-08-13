import React from 'react';
import { MusicEntry } from '../../../models/music';
import Spinner from '../spinner';

type DisplayMusicNameProps = React.PropsWithoutRef<{
	music: MusicEntry,
}>;

type DisplayMusicNameComponent = React.FunctionComponent<DisplayMusicNameProps>;

const DisplayMusicName: DisplayMusicNameComponent = ({ music }) => {
	const [name, setName] = React.useState(music.name);

	React.useEffect(() => {
		if (music.name instanceof Promise) {
			music.name.then(setName).catch(e => e);
		}
	}, [music.name]);

	if (typeof name !== 'string') return <Spinner size={15} />;
	return <>{name}</>
}

export default DisplayMusicName;