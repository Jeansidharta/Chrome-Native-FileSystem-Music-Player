import React from 'react';
import styled from 'styled-components';
import SearchAndFilter from './search-and-filter';
import ActionButtons from './action-buttons';

const Root = styled.header`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 8px 16px;
	box-shadow: -3px 3px 3px rgba(0, 0, 0, 0.3);
`;

const Navbar = () => {
	return (
		<Root>
			<ActionButtons />
			<SearchAndFilter />
		</Root>
	);
}

export default Navbar;