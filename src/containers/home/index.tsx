import React from 'react';
import Head from 'next/head';
import { useFileSystem } from '../../contexts/file-system';
import MusicItem from './music-item';
import styled from 'styled-components';
import { usePlayingMusic } from '../../contexts/playing-music';
import { useSortFilter } from '../../contexts/sort-filter';

const MainRoot = styled.main`
	padding: 32px;
`;

function Home () {
	const { fileSystem } = useFileSystem();
	const { setQueue } = usePlayingMusic();
	const { filterFunction, sortFunction, searchString } = useSortFilter();

	function searchStringFilter (a: FileSystemFileHandle) {
		return a.name.trim().toLowerCase().includes(searchString.trim().toLowerCase());
	}

	const cleanMusicList = fileSystem?.music.filter(searchStringFilter);

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
			<Head>
				<title>Bom dia!</title>
			</Head>
			{renderMusicItems()}
		</MainRoot>
	);
}

export default Home;
