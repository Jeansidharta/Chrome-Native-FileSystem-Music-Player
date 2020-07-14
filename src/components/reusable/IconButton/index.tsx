import React from 'react';
import styled from 'styled-components';

const Root = styled.button<React.PropsWithChildren<{ size: number }>>`
	margin: 0 8px;
	border-radius: 4px;
	padding: 3px;
	cursor: pointer;
	border: none;
	box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.2);
	background-color: transparent;
	transition: 200ms;
	outline: none;
	:hover, :focus {
		transform: scale(1.1);
		box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.2);
	}
	:active {
		transform: scale(0.9);
		box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.2);
	}

	${(props: { size: number }) => `
		width: ${props.size}px;
		height: ${props.size}px;
	`}
`;

type IconButtonProps = React.PropsWithoutRef<{
	icon: JSX.Element,
	size?: 'small' | 'medium' | 'large' | number,
}>;

function IconButton (props: IconButtonProps) {
	let sizeNumber: number;
	if (props.size === null || props.size === undefined) sizeNumber = 24;
	else if (typeof props.size === 'number') sizeNumber = props.size;
	else if (props.size === 'small') sizeNumber = 16;
	else if (props.size === 'medium') sizeNumber = 24;
	else if (props.size === 'large') sizeNumber = 32;
	else throw new Error(`Invalid size '${props.size}'`);

	return (
		<Root size={sizeNumber}>
			{props.icon}
		</Root>
	);
}

export default IconButton;