import React from 'react';
import MusicItem from './music-item';
import styled from 'styled-components';
import { usePlayingMusic } from '../../contexts/playing-music';
import { useSort } from '../../contexts/sort';
import { useSearchString } from '../../contexts/search-string';
import { MusicEntry } from '../../models';

const MainRoot = styled.main`
	padding: 32px;
`;

function extractMusicName (music: MusicEntry) {
	return music.file.name;
}

function Home () {
	const { play, allMusic } = usePlayingMusic();
	const { makeSortFunction, setPossibleSortOptions, selectedSortOption } = useSort();
	const { makeSearchFunction } = useSearchString();

	React.useEffect(() => {
		setPossibleSortOptions(['name']);
	}, []);

	function makeSortKeyExtractor () {
		if (!selectedSortOption) {
			return () => '';
		} else if(selectedSortOption.name === 'name') {
			return (music: MusicEntry) => music.file.name;
		} else throw new Error(`invalid sort option '${selectedSortOption.name}'`);
	}

	const sortKeyExtractor = makeSortKeyExtractor();

	const cleanMusicList = allMusic
		.filter(makeSearchFunction(extractMusicName))
		.sort(makeSortFunction(sortKeyExtractor));

	function handleMusicClick (music: MusicEntry) {
		play(music);
	}

	function renderMusicItems () {
		if (!cleanMusicList) return <>Please, open a music folder.</>;

		return cleanMusicList.map((music, index) =>
			<MusicItem
				key={index}
				music={music}
				onClick={() => handleMusicClick(music)}
			/>
		);
	}

	return (
		<MainRoot>
			{renderMusicItems()}
		</MainRoot>
	);
}

export default Home;
