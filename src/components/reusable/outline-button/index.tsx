import React from 'react';
import styled, { useTheme } from 'styled-components';

const Root = styled.button<{ color?: string, scaleOffset: number }>`
	text-transform: uppercase;
	padding: 4px 16px;
	border-radius: 8px;
	border: none;
	background-color: ${(props) => props.color || props.theme.colors.gray.light};
	color: inherit;
	cursor: ${({ disabled }) => disabled ? 'auto' : 'pointer'};
	box-shadow: ${props => props.theme.shadows.small.normal};
	outline: none;
	transition: transform 200ms, box-shadow 200ms;
	opacity: ${({ disabled }) => disabled ? 0.5 : 1};
	:hover, :focus {
		box-shadow: ${props => props.disabled ? props.theme.shadows.small.normal : props.theme.shadows.small.hover};
		transform: scale(${(props) => 1 + (props.disabled ? 0 : props.scaleOffset)});
	}
	:active {
		box-shadow: ${props => props.disabled ? props.theme.shadows.small.normal : props.theme.shadows.small.active};
		transform: scale(${(props) => 1 - (props.disabled ? 0 : props.scaleOffset)});
	}
`;

type OutlineButtonProps = React.PropsWithChildren<{
	/** Could be a hex color, or either 'primary' or 'secondary', for theme use.
	* If none specified, defaults to a light gray color */
	color?: string,

	/** How much the button will expand/contract when hovered/held. Defaults to 0.1 */
	scaleOffset?: number,

	/** Equivalent to title. Required for accessibility */
	actionDescription: string,
}> & React.ComponentProps<'button'>;

type OutlineButtonComponent = React.FunctionComponent<OutlineButtonProps>;

const OutlineButton: OutlineButtonComponent = ({
	ref,
	color,
	scaleOffset = 0.1,
	actionDescription,
	...props
}) => {
	const theme = useTheme();

	let hexColor: string | undefined;
	if (color === 'primary') hexColor = theme.colors.primary.main;
	else if (color === 'secondary') hexColor = theme.colors.secondary.main;
	else hexColor = color;

	return (
		<Root
			color={hexColor}
			scaleOffset={scaleOffset}
			title={actionDescription}
			{...props}
		/>
	);
}

export default OutlineButton;