import styled, { FlattenSimpleInterpolation } from 'styled-components';

const BaseImage = styled.img`
	object-fit: contain;
	width: 100%;
	height: 100%;
	${(props: { css?: FlattenSimpleInterpolation }) => props.css || ''};
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
		Sort: styled(BaseImage).attrs(props => ({
			src: '/icons/sort.svg',
			alt: 'Sort Icon',
			...props,
		}))``,
		Filter: styled(BaseImage).attrs(props => ({
			src: '/icons/filter.svg',
			alt: 'Filter Icon',
			...props,
		}))``,
		ArrowUp: styled(BaseImage).attrs(props => ({
			src: '/icons/arrow-up.svg',
			alt: 'Arrow up Icon',
			...props,
		}))``,
		File: styled(BaseImage).attrs(props => ({
			src: '/icons/file-icon.svg',
			alt: 'A File Icon',
			...props,
		}))``,
		YoutubePlayButton: styled(BaseImage).attrs(props => ({
			src: '/icons/youtube-icon.svg',
			alt: 'A Youtube Play Button Icon',
			...props,
		}))``,
	}
}

export default Images;