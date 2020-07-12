import styled from 'styled-components';

const BaseImage = styled.img`
	object-fit: center;
	${({ css }) => css}
`;

const Images = {
	Icons: {
		PlayButton: styled(BaseImage).attrs(props => ({
			src: '/icons/play-button.svg',
			alt: 'Play Button Icon',
			...props,
		}))``,
		PauseButton: styled(BaseImage).attrs(props => ({
			src: '/icons/pause-button.svg',
			alt: 'Pause Button Icon',
			...props,
		}))``,
		NextButton: styled(BaseImage).attrs(props => ({
			src: '/icons/next-button.svg',
			alt: 'Next Music Button Icon',
			...props,
		}))``,
		PrevButton: styled(BaseImage).attrs(props => ({
			src: '/icons/prev-button.svg',
			alt: 'Previous Music Button Icon',
			...props,
		}))``,
		DoubleNextButton: styled(BaseImage).attrs(props => ({
			src: '/icons/double-next-button.svg',
			alt: 'Double Next Music Button Icon',
			...props,
		}))``,
		DoublePrevButton: styled(BaseImage).attrs(props => ({
			src: '/icons/double-prev-button.svg',
			alt: 'Double Previous Music Button Icon',
			...props,
		}))``,
	}
}

export default Images;