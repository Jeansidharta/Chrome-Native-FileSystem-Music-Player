import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px;
	margin: 0 4px;
	border-bottom: 1px solid black;
`;

const Description = styled.p`
	margin: 0;
`;

const Shortcut = styled.p`
	margin: 0;
	color: rgba(0, 0, 0, 0.5);
	font-weight: bold;
	font-family: monospace;
	font-size: 16px;
	text-transform: capitalize;
`;

type ShortcutItemProps = React.PropsWithoutRef<{
	description: string,
	shortcutText: string,
}>;

type ShortcutItemComponent = React.FunctionComponent<ShortcutItemProps>;

const ShortcutItem: ShortcutItemComponent = ({ description, shortcutText }) => {
	return (
		<Root>
			<Description>{description}</Description>
			<Shortcut>{shortcutText}</Shortcut>
		</Root>
	);
}

export default ShortcutItem;