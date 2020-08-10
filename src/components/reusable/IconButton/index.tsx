import React from 'react';
import styled from 'styled-components';

const Root = styled.button<React.PropsWithoutRef<{ size: number, disabled: boolean, noHoverEffect: boolean  }>>`
	margin: 0 8px;
	border-radius: 4px;
	padding: 3px;
	border: none;
	box-shadow: ${props => props.theme.shadows.small.normal};
	background-color: transparent;
	transition: 200ms;
	outline: none;
	display: flex;
	align-items: center;
	justify-content: center;

	${({ size }) => `
		width: ${size}px;
		height: ${size}px;
	`}

	${({ disabled, theme, noHoverEffect }) => disabled ? `
		opacity: 0.5;
		cursor: not-allowed;
	` : `
		cursor: pointer;
	` + (noHoverEffect ? `` : `
		:hover, :focus {
			transform: scale(1.1);
			box-shadow: ${theme.shadows.small.hover};
		}
		:active {
			transform: scale(0.9);
			box-shadow: ${theme.shadows.small.active};
		}
	`)}
`;

type IconButtonProps = React.PropsWithoutRef<{
	icon: JSX.Element,
	size?: 'small' | 'medium' | 'large' | number,
	disabled?: boolean,
	actionDescription: string,
	noHoverEffect?: boolean,
}> & React.ComponentPropsWithoutRef<'button'>;

type IconButtonComponent = React.FunctionComponent<IconButtonProps>;

const IconButton: IconButtonComponent = ({
	icon,
	children,
	size = 'medium',
	disabled = false,
	actionDescription,
	noHoverEffect = false,
	...props
}) => {
	let sizeNumber: number;
	if (typeof size === 'number') sizeNumber = size;
	else if (size === 'small') sizeNumber = 16;
	else if (size === 'medium') sizeNumber = 24;
	else if (size === 'large') sizeNumber = 32;
	else throw new Error(`Invalid size '${size}'`);

	return (
		<Root
			title={actionDescription}
			size={sizeNumber}
			disabled={disabled}
			noHoverEffect={noHoverEffect}
			{...props}
		>
			{icon}
		</Root>
	);
}

export default IconButton;