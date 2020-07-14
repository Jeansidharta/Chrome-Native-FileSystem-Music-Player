import React from 'react';
import styled from 'styled-components';
import { useModal } from '../../../contexts/modal';
import SortItem from './sort-item';
import { useSort, SortOptionValue } from '../../../contexts/sort';

const Root = styled.div`
`;

function useSortModal () {
	const { openModal } = useModal();
	const { possibleSortOptions } = useSort();

	return () => openModal(
		<Root>
			{possibleSortOptions.map(option => <SortItem
				name={option}
				key={option}
			/>)}
		</Root>
	);
}

export default useSortModal;