import React from 'react';
import styled from 'styled-components';
import { useMusicTimestamp } from '../../../contexts/music-timestamp';
import { usePlayingMusic } from '../../../contexts/playing-music';

const Root = styled.div`
	width: 100%;
`;

const BarContainer = styled.div`
	width: 100%;
	height: 10px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	cursor: pointer;
	transition: 200ms;
	:hover {
		border: 1px solid rgba(0, 0, 0, 0.5);
	}
`;

const BarProgress = styled.div<{ progress: number }>`
	background-color: palegreen;
	height: 100%;
`;

type MusicProgressBarProps = React.PropsWithoutRef<{
}>;

type MusicProgressBarComponent = React.FunctionComponent<MusicProgressBarProps>;

const MusicProgressBar: MusicProgressBarComponent = ({  }) => {
	const [progress, setProgress] = React.useState<number>(0);
	const { currentlyPlaying } = usePlayingMusic();
	const { getTimestamp, setTimestamp } = useMusicTimestamp();

	const isMouseDownRef = React.useRef<boolean>(false);

	React.useEffect(() => {
		function updateProgressBar () {
			const totalDuration = currentlyPlaying!.duration;
			if (!totalDuration) return setProgress(0);
			const timestamp = getTimestamp() || 0;
			const percentage = 100 * timestamp / totalDuration;
			setProgress(percentage);
		}

		if (!currentlyPlaying) return setProgress(0);

		setProgress(0);
		const intervalHandler = setInterval(updateProgressBar, 500);
		return () => clearInterval(intervalHandler);
	}, [getTimestamp, currentlyPlaying]);

	function updateProgress (event: React.MouseEvent<HTMLDivElement> | MouseEvent) {
		const target = (event.currentTarget as HTMLDivElement);
		const x = event.clientX - target.offsetLeft;
		const width = target.clientWidth;
		const percentage = x / width;
		const duration = currentlyPlaying?.duration || 0;
		const newTimestamp = duration * percentage;
		setTimestamp(newTimestamp);
		setProgress(100 * percentage);
	}

	function handleBarMouseDown (event: React.MouseEvent<HTMLDivElement>) {
		isMouseDownRef.current = true;
		updateProgress(event);

		function waitForMouseUp () {
			isMouseDownRef.current = false;
			document.body.removeEventListener('mouseup', waitForMouseUp);
			document.body.removeEventListener('mousemove', mouseDrag);
		}

		function mouseDrag (event: MouseEvent) {
			updateProgress(event);
		}

		document.body.addEventListener('mouseup', waitForMouseUp);
		document.body.addEventListener('mousemove', mouseDrag);
	}

	return (
		<Root>
			<BarContainer onMouseDown={handleBarMouseDown}>
				<BarProgress
					progress={progress}
					style={{ width: progress + '%' }}
				/>
			</BarContainer>
		</Root>
	);
}

export default MusicProgressBar;