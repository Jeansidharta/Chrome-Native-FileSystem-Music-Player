import React from 'react';
import styled from 'styled-components';
import useSortModal from '../../modals/sort-modal';
import useFilterModal from '../../modals/filter-modal';
import IconButton from '../../reusable/IconButton';
import { useSearchString } from '../../../contexts/search-string';
import { useSort } from '../../../contexts/sort';
import { useFilter } from '../../../contexts/filter';
import Images from '../../../constants/images';

const Root = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const SearchInput = styled.input.attrs(props => ({ type: 'text', name: 'search-bar', ...props }))`
	max-width: 200px;
	width: 100%;
	padding: 4px 8px;
	border: 1px solid transparent;
	outline: none;
	border-radius: 4px;
	box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.2);
	margin: 0 4px;
	transition: 200ms;
	:active, :focus {
		border-color: rgba(0, 0, 0, 0.5);
		box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2);
	}
`;

const SortIcon = styled(IconButton).attrs(() => ({ icon: <Images.Icons.Sort /> }))``;

const FilterIcon = styled(IconButton).attrs(() => ({ icon: <Images.Icons.Filter /> }))``;

type SearchAndFilterProps = React.PropsWithoutRef<{
}>;

type SearchAndFilterComponent = React.FunctionComponent<SearchAndFilterProps>;

const SearchAndFilter: SearchAndFilterComponent = ({  }) => {
	const { setSearchString } = useSearchString();
	const { possibleSortOptions } = useSort();
	const { possibleFilterOptions } = useFilter();
	const openFilterModal = useFilterModal();
	const openSortModal = useSortModal();

	function handleSearchChange (event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		setSearchString(value);
	}

	const canSort = possibleSortOptions.length > 0;
	const canFilter = possibleFilterOptions.length > 0;

	const sortActionDescription = `Sort elements${canSort? '' : ' - Cannot sort this page'}`;
	const filterActionDescription = `Filter elements${canFilter? '' : ' - Cannot filter this page'}`;

	return (
		<Root>
			<SortIcon
				onClick={openSortModal}
				disabled={!canSort}
				actionDescription={sortActionDescription}
			/>
			<FilterIcon
				onClick={openFilterModal}
				disabled={!canFilter}
				actionDescription={filterActionDescription}
			/>
			<SearchInput
				onChange={handleSearchChange}
				placeholder='Search...'
				title='Search for an element'
			/>
		</Root>
	);
}

export default SearchAndFilter;