import React from 'react';
import styled from 'styled-components';

import Images from '../../../constants/images';
import { useSort, SortOptionValue } from '../../../contexts/sort';

const Root = styled.button`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 0;
	outline: none;
	background-color: transparent;
	border-bottom: 1px solid rgba(0, 0, 0, 0.3);
	cursor: pointer;
	padding: 8px 0 8px 4px;
	transition: 200ms;
	font-size: 18px;
	border-left: 3px solid transparent;
	width: 100%;
	border-radius: 4px;
	text-transform: capitalize;
	:hover, :focus {
		border-left-color: green;
	}
`;

const OptionName = styled.p`
	margin: 0;
`;

type SortItemProps = React.PropsWithoutRef<{
	name: string,
}>;

type SortItemComponent = React.FunctionComponent<SortItemProps>;

const Icon = styled(Images.Icons.ArrowUp)`
	width: 16px;
	height: 16px;
	transition: 200ms;
	${(props: { orientation?: 'up' | 'down' }) => !props.orientation ? `
		opacity: 0;
		transform: rotate(180deg);
	` : props.orientation === 'down' ? `
		transform: rotate(180deg);
	` : `
	`}
`;

const SortItem: SortItemComponent = ({ name }) => {
	const { selectedSortOption, setSelectedSortOption } = useSort();

	const isSelected = selectedSortOption && selectedSortOption.name === name;
	const orientation = isSelected && (selectedSortOption!.value === 'crescent' ? 'down' : 'up');

	function handleClick () {
		if (!isSelected) {
			setSelectedSortOption({ name, value: 'crescent' });
			return;
		}

		const { value: oldValue } = selectedSortOption!;
		let value: SortOptionValue;
		if (oldValue === 'crescent') value = 'decrescent';
		else if (oldValue === 'decrescent') {
			setSelectedSortOption(null);
			return;
		} else throw new Error(`invalid value '${oldValue}'`);
		setSelectedSortOption({ name, value });
	}

	return (
		<Root onClick={handleClick}>
			<OptionName>{name}</OptionName>
			<Icon orientation={orientation ? orientation : undefined} />
		</Root>
	);
}

export default SortItem;