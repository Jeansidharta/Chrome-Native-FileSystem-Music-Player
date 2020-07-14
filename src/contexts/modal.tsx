import React from 'react';

type ModalContext = {
	element: JSX.Element | null,
	clearModal: () => void,
	openModal: (elem: JSX.Element | null) => void,
}

const modalContext = React.createContext<ModalContext | null>(null);

export function ModalContextProvider ({ ...props }) {
	const [modalElement, setModalElement] = React.useState<JSX.Element | null>(null);

	function clearModal () {
		setModalElement(null);
	}

	return <modalContext.Provider {...props} value={{
		element: modalElement,
		clearModal,
		openModal: setModalElement,
	}} />
}

export function useModal () {
	return React.useContext(modalContext) as ModalContext;
}