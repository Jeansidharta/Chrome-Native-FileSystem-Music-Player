import React from 'react';
import styled from 'styled-components';
import Images from '../../constants/images';
import IconButton from '../reusable/IconButton';
import useFilterModal from '../modals/filter-modal';
import useSortModal from '../modals/sort-modal';
import { useSearchString } from '../../contexts/search-string';
import { useSort } from '../../contexts/sort';
import { useFilter } from '../../contexts/filter';
import { usePlayingMusic } from '../../contexts/playing-music';

const Root = styled.header`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 8px 16px;
	box-shadow: -3px 3px 3px rgba(0, 0, 0, 0.3);
`;

const ButtonsContainer = styled.nav`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
`;

const SearchInput = styled.input.attrs(props => ({ type: 'text', ...props }))`
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

const Button = styled.button`
	cursor: pointer;
	background-color: transparent;
	border: none;
	box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
	border-radius: 8px;
	padding: 4px 8px;
	font-size: 12px;
	transition: 200ms;
	outline: none;
	:hover, :focus {
		box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.1);
		transform: scale(1.1);
	}
	:active {
		box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.4);
		transform: scale(0.9);
	}
`;

const DataOrganizationContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const SortIcon = styled(IconButton).attrs(() => ({ icon: <Images.Icons.Sort /> }))``;

const FilterIcon = styled(IconButton).attrs(() => ({ icon: <Images.Icons.Filter /> }))``;

const Navbar = () => {
	const { setSearchString } = useSearchString();
	const { possibleSortOptions } = useSort();
	const { possibleFilterOptions } = useFilter();
	const { requestLoadDirectory } = usePlayingMusic();
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
			<ButtonsContainer>
				<Button onClick={requestLoadDirectory}>Add files<br/>from folder</Button>
			</ButtonsContainer>
			<DataOrganizationContainer>
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
			</DataOrganizationContainer>
		</Root>
	);
}

export default Navbar;