import React from 'react';
import MusicItem from './music-item';
import styled from 'styled-components';
import { usePlayingMusic } from '../../contexts/playing-music';
import { useSort } from '../../contexts/sort';
import { useSearchString } from '../../contexts/search-string';
import { MusicEntry } from '../../models/music';

const MainRoot = styled.main`
	padding: 32px;
`;

function extractMusicName (music: MusicEntry) {
	return music.name;
}

function Home () {
	const { play, allMusic } = usePlayingMusic();
	const { makeSortFunction, setPossibleSortOptions, selectedSortOption } = useSort();
	const { makeSearchFunction, searchString } = useSearchString();

	const isSearching = searchString !== '';

	React.useEffect(() => {
		setPossibleSortOptions(['name']);
	}, []);

	function makeSortKeyExtractor () {
		if (!selectedSortOption) {
			return () => '';
		} else if(selectedSortOption.name === 'name') {
			return (music: MusicEntry) => music.name;
		} else throw new Error(`invalid sort option '${selectedSortOption.name}'`);
	}

	const sortKeyExtractor = makeSortKeyExtractor();

	const cleanMusicList = isSearching ? allMusic
		.filter(entry => typeof entry.name === 'string')
		.filter(makeSearchFunction(extractMusicName as () => string))
		.sort(makeSortFunction(sortKeyExtractor)) : allMusic;

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
