import React from 'react';
import styled, { useTheme } from 'styled-components';

const Root = styled.button<{ color?: string, scaleOffset: number }>`
	text-transform: uppercase;
	padding: 4px 16px;
	border-radius: 12px;
	border: none;
	background-color: ${(props) => props.color || props.theme.colors.primary.main};
	color: inherit;
	cursor: pointer;
	outline: none;
	transition: transform 200ms;
	:hover, :focus {
		transform: scale(${(props) => 1 + props.scaleOffset});
	}
	:active {
		transform: scale(${(props) => 1 - props.scaleOffset});
	}
`;

type OutlineButtonProps = React.PropsWithChildren<{
	/** Could be a hex color, or either 'primary' or 'secondary', for theme use. Defaults to 'primary' */
	color?: string,

	/** How much the button will expand/contract when hovered/held. Defaults to 0.1 */
	scaleOffset?: number,
}> & React.ComponentProps<'button'>;

type OutlineButtonComponent = React.FunctionComponent<OutlineButtonProps>;

const OutlineButton: OutlineButtonComponent = ({ ref, color, scaleOffset = 0.1, ...props }) => {
	const theme = useTheme();

	let hexColor: string;
	if (!color || color === 'primary') hexColor = theme.colors.primary.main;
	else if (color === 'secondary') hexColor = theme.colors.secondary.main;
	else hexColor = color;

	return (
		<Root color={hexColor} scaleOffset={scaleOffset} {...props} />
	);
}

export default OutlineButton;