import React from 'react';

import styled, { css } from 'styled-components';
import Images from '../../constants/images';
import { usePlayingMusic } from '../../contexts/playing-music';
import { useVolume } from '../../contexts/volume';

const Root = styled.footer`
	border-top: 1px solid rgba(0, 0, 0, 0.3);
	padding: 16px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ControlsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 8px 0;
`;

const ActionButtonStyles = css`
	height: 24px;
	width: 24px;
	cursor: pointer;
	margin: 0 8px;
`;

const VolumeSlider = styled.input.attrs(props => ({ type: 'range', ...props }))`
	max-width: 300px;
	width: 100%;
`;

const MusicName = styled.p`
	margin: 0;
	padding: 8px 0;
`;

const PlayButton = styled(Images.Icons.PlayButton).attrs(() => ({ css: ActionButtonStyles}))``;
const PauseButton = styled(Images.Icons.PauseButton).attrs(() => ({ css: ActionButtonStyles}))``;
const NextButton = styled(Images.Icons.NextButton).attrs(() => ({ css: ActionButtonStyles}))``;
const PrevButton = styled(Images.Icons.PrevButton).attrs(() => ({ css: ActionButtonStyles}))``;
const DoublePrevButton = styled(Images.Icons.DoublePrevButton).attrs(() => ({ css: ActionButtonStyles}))``;
const DoubleNextButton = styled(Images.Icons.DoubleNextButton).attrs(() => ({ css: ActionButtonStyles}))``;

const Footer = () => {
	const volumeSliderRef = React.useRef<HTMLInputElement>(null);
	const {
		pause,
		resume,
		musicStatus: { playing, currentlyPlaying }
	} = usePlayingMusic();

	const { updateVolume, volume } = useVolume();

	function handleVolumeSliderChange (event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		updateVolume(Number(value));
	}

	React.useEffect(() => {
		if (!volumeSliderRef.current) return;
		volumeSliderRef.current.value = volume.toString();
	}, [volume]);

	function renderCurrentMusicInfo () {
		const musicName = currentlyPlaying?.handler.name || 'Nothing playing';
		return (
			<MusicName>{musicName}</MusicName>
		);
	}

	return (
		<Root>
			{renderCurrentMusicInfo()}
			<ControlsContainer>
				<DoublePrevButton />
				<PrevButton />
				{ playing
					? <PauseButton onClick={pause} />
					: <PlayButton onClick={resume} />
				}
				<NextButton />
				<DoubleNextButton />
			</ControlsContainer>
			<VolumeSlider
				min="0"
				max="1"
				step="0.01"
				onChange={handleVolumeSliderChange}
				ref={volumeSliderRef}
			/>
		</Root>
	);
}

export default Footer;