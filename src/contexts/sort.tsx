import React from 'react';

export type SortOptionValue = 'crescent' | 'decrescent';

export type SortOption = {
	name: string,
	value: SortOptionValue,
};

type SortFunction<DataType> = (a: DataType, b: DataType) => number;
type KeyExtractor<DataType, KeyType> = (a: DataType) => KeyType;
type MakeSortFunction = <DataType, KeyType>(keyExtractor: KeyExtractor<DataType, KeyType>) => SortFunction<DataType>;

type SortContext = {
	makeSortFunction: MakeSortFunction;
	selectedSortOption: SortOption | null,
	setSelectedSortOption: (option: SortOption | null) => void,
	possibleSortOptions: string[],
	setPossibleSortOptions: (options: string[]) => void,
}

const SortContext = React.createContext<SortContext | null>(null);

function compareValues (a: any, b: any): number {
	if (typeof a === 'string' || typeof b === 'string') {
		return a.toString().localeCompare(b);
	} else {
		return a - b;
	}
}

export function SortProvider ({ ...props }) {
	const [possibleSortOptions, setPossibleSortOptions] = React.useState<string[]>([]);
	const [selectedSortOption, setSelectedSortOption] = React.useState<SortOption | null>(null);

	function makeSortFunction<DataType, ValueType>(keyExtractor: KeyExtractor<DataType, ValueType>) {
		if (!selectedSortOption) return () => 0;
		if (selectedSortOption.value === 'crescent') {
			return (a: DataType, b: DataType) => compareValues(keyExtractor(a), keyExtractor(b));
		}
		return (a: DataType, b: DataType) => -compareValues(keyExtractor(a), keyExtractor(b));
	}

	return (
		<SortContext.Provider {...props} value={{
			makeSortFunction,
			selectedSortOption,
			setSelectedSortOption,
			possibleSortOptions,
			setPossibleSortOptions,
		}} />
	);
}

export function useSort() {
	return React.useContext(SortContext) as SortContext;
}