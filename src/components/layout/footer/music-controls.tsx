import React from 'react';
import styled, { css } from 'styled-components';
import Images from '../../../constants/images';
import { usePlayingMusic } from '../../../contexts/playing-music';

const Root = styled.div`
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

const PlayButton = styled(Images.Icons.PlayButton).attrs(() => ({ css: ActionButtonStyles}))``;
const PauseButton = styled(Images.Icons.PauseButton).attrs(() => ({ css: ActionButtonStyles}))``;
const NextButton = styled(Images.Icons.NextButton).attrs(() => ({ css: ActionButtonStyles}))``;
const PrevButton = styled(Images.Icons.PrevButton).attrs(() => ({ css: ActionButtonStyles}))``;
// const DoublePrevButton = styled(Images.Icons.DoublePrevButton).attrs(() => ({ css: ActionButtonStyles}))``;
// const DoubleNextButton = styled(Images.Icons.DoubleNextButton).attrs(() => ({ css: ActionButtonStyles}))``;

type MusicControlsProps = React.PropsWithoutRef<{}>;
type MusicControlsComponent = React.FunctionComponent<MusicControlsProps>;

const MusicControls: MusicControlsComponent = () => {
	const {
		pause,
		resume,
		playNext,
		playPrevious,
		musicStatus: { playing },
	} = usePlayingMusic();

	return (
		<Root>
			{/* <DoublePrevButton /> */}
			<PrevButton onClick={playPrevious} />
			{ playing
				? <PauseButton onClick={pause} />
				: <PlayButton onClick={resume} />
			}
			<NextButton onClick={playNext} />
			{/* <DoubleNextButton /> */}
		</Root>
	);
}

export default MusicControls;