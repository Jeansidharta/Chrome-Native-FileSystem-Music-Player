import React from 'react';
import styled from 'styled-components';

const Root = styled.button<React.PropsWithoutRef<{ size: number, disabled: boolean  }>>`
	margin: 0 8px;
	border-radius: 4px;
	padding: 3px;
	border: none;
	box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.2);
	background-color: transparent;
	transition: 200ms;
	outline: none;

	${({ size }) => `
		width: ${size}px;
		height: ${size}px;
	`}

	${({ disabled }) => disabled ? `
		opacity: 0.5;
		cursor: not-allowed;
	` : `
		cursor: pointer;
		:hover, :focus {
			transform: scale(1.1);
			box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.2);
		}
		:active {
			transform: scale(0.9);
			box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.2);
		}
	`}
`;

type IconButtonProps = React.PropsWithoutRef<{
	icon: JSX.Element,
	size?: 'small' | 'medium' | 'large' | number,
	disabled: boolean,
	actionDescription: string,
}> & React.ComponentPropsWithoutRef<'button'>;

type IconButtonComponent = React.FunctionComponent<IconButtonProps>;

const IconButton: IconButtonComponent = ({
	icon,
	children,
	size = 'medium',
	disabled,
	actionDescription,
	...props
}) => {
	let sizeNumber: number;
	if (typeof size === 'number') sizeNumber = size;
	else if (size === 'small') sizeNumber = 16;
	else if (size === 'medium') sizeNumber = 24;
	else if (size === 'large') sizeNumber = 32;
	else throw new Error(`Invalid size '${size}'`);

	return (
		<Root title={actionDescription} size={sizeNumber} disabled={disabled} {...props}>
			{icon}
		</Root>
	);
}

export default IconButton;