import React from 'react';

type FilterContext = {
	possibleFilterOptions: string[],
	setPossibleFilterOptions: (options: string[]) => void,
	selectedFilterOption: string | null,
	setSelectedFilterOption: (option: string | null) => void,
}

const FilterContext = React.createContext<FilterContext | null>(null);

export function FilterProvider ({ ...props }) {
	const [possibleFilterOptions, setPossibleFilterOptions] = React.useState<string[]>([]);
	const [selectedFilterOption, setSelectedFilterOption] = React.useState<string | null>(null);

	return (
		<FilterContext.Provider {...props} value={{
			possibleFilterOptions,
			setPossibleFilterOptions,
			selectedFilterOption,
			setSelectedFilterOption,
		}} />
	);
}

export function useFilter() {
	return React.useContext(FilterContext) as FilterContext;
}