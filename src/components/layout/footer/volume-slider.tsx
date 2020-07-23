import React from 'react';
import styled from 'styled-components';
import { useVolume } from '../../../contexts/volume';

const RootSlider = styled.input.attrs(props => ({ type: 'range', ...props }))`
	max-width: 300px;
	width: 100%;
`;

type VolumeSliderProps = React.PropsWithoutRef<{}>;
type VolumeSliderComponent = React.FunctionComponent<VolumeSliderProps>;

const VolumeSlider: VolumeSliderComponent = () => {
	const volumeSliderRef = React.useRef<HTMLInputElement>(null);
	const { updateVolume, volume } = useVolume();

	function handleVolumeSliderChange (event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		updateVolume(Number(value));
	}

	React.useEffect(() => {
		if (!volumeSliderRef.current) return;
		volumeSliderRef.current.value = volume.toString();
	}, [volume]);

	return (
		<RootSlider
			min="0"
			max="1"
			step="0.01"
			onChange={handleVolumeSliderChange}
			ref={volumeSliderRef}
		/>
	);
}

export default VolumeSlider;