import React from 'react';
import styled from 'styled-components';
import { useModal } from '../../../contexts/modal';
import FilterItem from './filter-item';
import { useFilter } from '../../../contexts/filter';

const Root = styled.div`
`;

function useSortModal () {
	const { openModal } = useModal();
	const { possibleFilterOptions } = useFilter();

	return () => openModal(
		<Root>
			{possibleFilterOptions.map(option => <FilterItem
				name={option}
				key={option}
			/>)}
		</Root>
	);
}

export default useSortModal;