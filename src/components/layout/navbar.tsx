import React from 'react';
import styled from 'styled-components';
import { useFileSystem } from '../../contexts/file-system';
import { openDirectory } from '../../libs/file-helpers';

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
	const { setFileSystem } = useFileSystem();

	async function openFolder () {
		let dir;
		try {
			dir = await openDirectory();
		} catch (e) {
			console.error(e);
			return;
		}
		const files = [];
		for await(const file of dir.getEntries()) {
			files.push(file);
		}
		setFileSystem({ directory: dir, music: files });
	}

	return (
		<Root>
			<Button onClick={openFolder}>Open folder</Button>
		</Root>
	);
}

export default Navbar;