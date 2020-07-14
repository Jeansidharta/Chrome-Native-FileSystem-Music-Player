import React from 'react';
import styled from 'styled-components';

type ButtonProps = React.PropsWithRef<{
	variant: 'normal' | 'danger',
}>;

const Button = styled.button<ButtonProps>`
	cursor: pointer;
	border: none;
	${({ variant = 'normal' }) =>
		variant === 'normal' ? `
		` : variant === 'danger' ? `
		` : ``
	}
`;

export default Button;