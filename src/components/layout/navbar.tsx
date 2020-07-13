import React from 'react';
import styled from 'styled-components';
import { useFileSystem } from '../../contexts/file-system';

const Root = styled.header`
	height: 10vh;
	display: flex;
	align-items: center;
	padding: 8px 16px;
	flex-direction: row-reverse;
	box-shadow: -3px 3px 3px rgba(0, 0, 0, 0.3);
`;

const Button = styled.button`
	border-bottom: 1px solid black;
`;

const Navbar = () => {
	const { requestDirectoryAccess } = useFileSystem();

	return (
		<Root>
			<Button onClick={requestDirectoryAccess}>Select folder</Button>
		</Root>
	);
}

export default Navbar;