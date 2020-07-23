import React from 'react';

import styled from 'styled-components';

import MusicControls from './music-controls';
import VolumeSlider from './volume-slider';
import CurrentMusicInfo from './current-music-info';
import MusicProgressBar from './music-progress-bar';

const Root = styled.footer`
	padding: 0 0 16px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Footer = () => {

	return (
		<Root>
			<MusicProgressBar />
			<CurrentMusicInfo />
			<MusicControls />
			<VolumeSlider />
		</Root>
	);
}

export default Footer;