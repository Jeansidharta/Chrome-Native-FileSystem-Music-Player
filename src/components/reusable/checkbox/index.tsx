import React from 'react';
import styled from 'styled-components';
import useUpdate from '../../../libs/hooks/useUpdate';

const Root = styled.button`
	${(props: { size: number }) => `
		width: ${props.size}px;
		height: ${props.size}px;
	`}
	border: 1px solid rgba(0, 0, 0, 0.3);
	box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.2);
	border-radius: 4px;
	padding: 2px;
	background-color: white;
	outline: none;
	cursor: pointer;
	transition: 200ms;
	:hover, :focus {
		box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.2);
		transform: scale(1.1);
	}
	:active {
		box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.2);
		transform: scale(0.9);
	}
`;

const Svg = styled.svg`
	width: 100%;
	height: 100%;
`;

type CheckboxProps = React.PropsWithRef<{
	animationTime?: number,
	initialValue?: boolean,
	onChange?: (newValue: boolean) => void,
	size?: number,
}> & React.ComponentProps<'div'>;

type CheckboxRefAttributes = {
	check: () => void,
	uncheck: () => void,
	toggle: () => void,
};

type CheckboxComponent = React.ForwardRefRenderFunction<CheckboxRefAttributes, CheckboxProps>;
const Checkbox: CheckboxComponent = ({
	animationTime = 300,
	initialValue = false,
	onChange = () => {},
	size = 32,
	...props
}, ref) => {
	const [checked, setChecked] = React.useState(initialValue);
	const pathRef = React.useRef<SVGPathElement>(null);
	const rootRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const pathLength = pathRef.current!.getTotalLength();
		pathRef.current!.style.strokeDasharray = pathLength.toString();
	}, []);

	React.useLayoutEffect(() => {
		const pathLength = pathRef.current!.getTotalLength();
		const { style } = pathRef.current!;

		if (checked) {
			style.strokeDashoffset = '';
		} else {
			style.strokeDashoffset = pathLength.toString();
		}
	}, [checked]);

	useUpdate(() => {
		if (onChange) onChange(checked);
	}, [checked]);

	React.useImperativeHandle(ref, () => ({
		check () {
			setChecked(true);
		},
		uncheck () {
			setChecked(false);
		},
		toggle () {
			setChecked(!checked);
		},
	}), [checked]);

	function handleClick (event: React.MouseEvent<HTMLDivElement>) {
		setChecked(!checked);
		if (props.onClick) props.onClick(event);
	}

	return (
		<Root {...props} onClick={handleClick} size={size} ref={rootRef}>
			<Svg viewBox='0 0 97 81' width='97' height='81' fill='none' stroke='green' strokeWidth='10' strokeLinejoin='round' strokeLinecap='round'>
				<path d="M2.5 42.5l 27 36l 65 -76" ref={pathRef} style={{ transition: `${animationTime}ms` }} />
			</Svg>
		</Root>
	);
}

export default React.forwardRef(Checkbox);