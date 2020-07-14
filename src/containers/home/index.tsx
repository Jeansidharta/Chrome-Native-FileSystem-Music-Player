import React from 'react';
import { useFileSystem } from '../../contexts/file-system';
import MusicItem from './music-item';
import styled from 'styled-components';
import { usePlayingMusic } from '../../contexts/playing-music';
import { useSort } from '../../contexts/sort';
import { useSearchString } from '../../contexts/search-string';

const MainRoot = styled.main`
	padding: 32px;
`;

function extractFileName (file: FileSystemFileHandle) {
	return file.name;
}

function Home () {
	const { fileSystem } = useFileSystem();
	const { setQueue } = usePlayingMusic();
	const { makeSortFunction, setPossibleSortOptions, selectedSortOption } = useSort();
	const { makeSearchFunction } = useSearchString();

	React.useEffect(() => {
		setPossibleSortOptions(['name']);
	}, []);

	function makeSortKeyExtractor () {
		if (!selectedSortOption) {
			return () => '';
		} else if(selectedSortOption.name === 'name') {
			return (file: FileSystemFileHandle) => file.name;
		} else throw new Error(`invalid sort option '${selectedSortOption.name}'`);
	}

	const sortKeyExtractor = makeSortKeyExtractor();

	const cleanMusicList = fileSystem?.music
		.filter(makeSearchFunction(extractFileName))
		.sort(makeSortFunction(sortKeyExtractor));

	function handleMusicClick (musicIndex: number) {
		setQueue(cleanMusicList!.slice(musicIndex), true);
	}

	function renderMusicItems () {
		if (!cleanMusicList) return <>Please, open a music folder.</>;

		return cleanMusicList.map((musicFileHandler, index) =>
			<MusicItem
				key={index}
				musicFileHandler={musicFileHandler}
				onClick={() => handleMusicClick(index)}
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
