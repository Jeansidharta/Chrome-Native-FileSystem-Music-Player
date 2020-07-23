import React from 'react';

import styled from 'styled-components';

import MusicControls from './music-controls';
import VolumeSlider from './volume-slider';
import CurrentMusicInfo from './current-music-info';

const Root = styled.footer`
	border-top: 1px solid rgba(0, 0, 0, 0.3);
	padding: 16px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Footer = () => {

	return (
		<Root>
			<CurrentMusicInfo />
			<MusicControls />
			<VolumeSlider />
		</Root>
	);
}

export default Footer;