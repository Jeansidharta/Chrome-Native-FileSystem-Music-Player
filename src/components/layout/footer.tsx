import React from 'react';

import styled, { css } from 'styled-components';
import Images from '../../constants/images';
import { usePlayingMusic } from '../../contexts/playing-music';

const Root = styled.footer`
	border-top: 1px solid rgba(0, 0, 0, 0.3);
	height: 10vh;
`;

const ControlsContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
`;

const ActionButtonStyles = css`
	height: 32px;
	width: 32px;
	cursor: pointer;
	margin: 0 8px;
`;

const PlayButton = styled(Images.Icons.PlayButton).attrs(() => ({ css: ActionButtonStyles}))``;
const PauseButton = styled(Images.Icons.PauseButton).attrs(() => ({ css: ActionButtonStyles}))``;
const NextButton = styled(Images.Icons.NextButton).attrs(() => ({ css: ActionButtonStyles}))``;
const PrevButton = styled(Images.Icons.PrevButton).attrs(() => ({ css: ActionButtonStyles}))``;
const DoublePrevButton = styled(Images.Icons.DoublePrevButton).attrs(() => ({ css: ActionButtonStyles}))``;
const DoubleNextButton = styled(Images.Icons.DoubleNextButton).attrs(() => ({ css: ActionButtonStyles}))``;

const Footer = () => {
	const { pause, resume, musicStatus: { playing } } = usePlayingMusic();

	return (
		<Root>
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
		</Root>
	);
}

export default Footer;