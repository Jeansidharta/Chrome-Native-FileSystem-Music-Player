import React from 'react';
import styled from 'styled-components';

import { useModal } from '../contexts/modal';

const ANIMATION_TIME = 200;

const Backdrop = styled.div`
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	position: fixed;
	padding: 16px;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	transition: ${ANIMATION_TIME}ms;
	opacity: 0;
`;

const Card = styled.div`
	width: 100%;
	max-width: 512px;
	padding: 16px;
	border-radius: 16px;
	background-color: white;
	box-shadow: -3px 3px 3px rgba(0, 0, 0, 0.5);
`;

function ModalRenderer () {
	const { element, clearModal } = useModal();
	const backdropRef = React.useRef<HTMLDivElement | null>(null);

	function closeModal () {
		backdropRef.current!.style.opacity = '0';
		setTimeout(clearModal, ANIMATION_TIME);
	}

	React.useEffect(() => {
		if (!element) return;
		backdropRef.current!.style.opacity = '1';
	}, [element]);

	React.useEffect(() => {
		if (!element) return;
		function closeWhenEsc (event: KeyboardEvent) {
			if (event.key === 'Escape') closeModal();
		}

		document.body.addEventListener('keydown', closeWhenEsc);
		return () => document.body.removeEventListener('keydown', closeWhenEsc);
	}, [element]);

	if (!element) return null;

	return (
		<Backdrop ref={backdropRef} onClick={closeModal}>
			<Card onClick={event => event.stopPropagation()}>
				{element}
			</Card>
		</Backdrop>
	);
}

export default ModalRenderer;