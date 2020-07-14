import React from 'react';
import styled from 'styled-components';
import { useFileSystem } from '../../contexts/file-system';
import { useSortFilter } from '../../contexts/sort-filter';
import Images from '../../constants/images';
import IconButton from '../reusable/IconButton';

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
	border-bottom: 1px solid black;
`;

const DataOrganizationContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const SortIcon = styled(IconButton).attrs(() => ({
	icon: <Images.Icons.Sort />,
}))``;

const FilterIcon = styled(IconButton).attrs(() => ({
	icon: <Images.Icons.Filter />,
}))``;

const Navbar = () => {
	const { requestDirectoryAccess } = useFileSystem();
	const { setSearchString } = useSortFilter();

	function handleSearchChange (event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		setSearchString(value);
	}

	return (
		<Root>
			<ButtonsContainer>
				<Button onClick={requestDirectoryAccess}>Select folder</Button>
			</ButtonsContainer>
			<DataOrganizationContainer>
				<SortIcon />
				<FilterIcon />
				<SearchInput
					onChange={handleSearchChange}
					placeholder='Search...'
				/>
			</DataOrganizationContainer>
		</Root>
	);
}

export default Navbar;