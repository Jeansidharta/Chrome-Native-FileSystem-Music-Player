import React from 'react';
import Head from 'next/head';
import { useFileSystem } from '../../contexts/file-system';
import MusicItem from './music-item';
import styled from 'styled-components';

const Root = styled.main`
	padding: 32px;
`;

function Home () {
	const { fileSystem } = useFileSystem();

	function renderMusicItems () {
		if (!fileSystem) return <>Please, open a music folder.</>;

		return fileSystem.music.map((musicFileHandler, index) =>
			<MusicItem key={index} musicFileHandler={musicFileHandler} />
		);
	}

	return (
		<Root>
			<Head>
				<title>Bom dia!</title>
			</Head>
			{renderMusicItems()}
		</Root>
	);
}

export default Home;
