import styled from 'styled-components';

const BaseImage = styled.img`
	object-fit: center;
`;

const Images = {
	Icons: {
		PlayButton: styled(BaseImage).attrs(props => ({
			src: '/icons/play-button.svg',
			alt: 'Play Button Icon',
			...props,
		}))``,
	}
}

export default Images;