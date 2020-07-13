import React from 'react';
import Head from 'next/head';
import { useFileSystem } from '../../contexts/file-system';
import MusicItem from './music-item';
import styled from 'styled-components';
import { usePlayingMusic } from '../../contexts/playing-music';

const MainRoot = styled.main`
	padding: 32px;
`;

function Home () {
	const { fileSystem } = useFileSystem();
	const { setQueue } = usePlayingMusic();

	function handleMusicClick (musicIndex: number) {
		setQueue(fileSystem!.music.slice(musicIndex), true);
	}

	function renderMusicItems () {
		if (!fileSystem) return <>Please, open a music folder.</>;

		return fileSystem.music.map((musicFileHandler, index) =>
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
