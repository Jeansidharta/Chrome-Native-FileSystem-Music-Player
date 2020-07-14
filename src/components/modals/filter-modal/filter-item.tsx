import React from 'react';
import styled from 'styled-components';

import Checkbox from '../../reusable/checkbox';

const Root = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 0;
	outline: none;
	background-color: transparent;
	border-bottom: 1px solid rgba(0, 0, 0, 0.3);
	padding: 8px 0 8px 4px;
	font-size: 18px;
	border-left: 3px solid transparent;
	width: 100%;
	border-radius: 4px;
	text-transform: capitalize;
`;

const OptionName = styled.p`
	margin: 0;
`;

type FilterItemProps = React.PropsWithoutRef<{
	name: string,
	onChange?: (value: boolean) => void,
}>;

type FilterItemComponent = React.FunctionComponent<FilterItemProps>;

const FilterItem: FilterItemComponent = ({ name, onChange }) => {
	return (
		<Root>
			<OptionName>{name}</OptionName>
			<Checkbox onChange={onChange} />
		</Root>
	);
}

export default FilterItem;