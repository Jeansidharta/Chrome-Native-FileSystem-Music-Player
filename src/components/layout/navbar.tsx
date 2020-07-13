import React from 'react';
import styled from 'styled-components';
import { useFileSystem } from '../../contexts/file-system';
import { useSortFilter } from '../../contexts/sort-filter';

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
	border-width: 2px;
	border-color: rgba(0, 0, 0, 0.3);
	border-radius: 4px;
	${(props: { isSearching: boolean }) => props.isSearching ? `
		border-color: red;
	` : `
	`}
`;

const Button = styled.button`
	border-bottom: 1px solid black;
`;

const Navbar = () => {
	const { requestDirectoryAccess } = useFileSystem();
	const { setSearchString, searchString } = useSortFilter();

	function handleSearchChange (event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		setSearchString(value);
	}

	return (
		<Root>
			<ButtonsContainer>
				<Button onClick={requestDirectoryAccess}>Select folder</Button>
			</ButtonsContainer>
			<SearchInput
				onChange={handleSearchChange}
				isSearching={Boolean(searchString)}
			/>
		</Root>
	);
}

export default Navbar;