import React from 'react';

type FilterFunction<DataType> = (a: DataType) => boolean;
type KeyExtractor<DataType, KeyType> = (a: DataType) => KeyType;
type MakeFilterFunction = <DataType, KeyType>(keyExtractor: KeyExtractor<DataType, KeyType>) => FilterFunction<DataType>;

type FilterContext = {
	makeFilterFunction: MakeFilterFunction,
	setFilterFunction: <DataType>(filter: FilterFunction<DataType>) => void,
}

const FilterContext = React.createContext<FilterContext | null>(null);

export function FilterProvider ({ ...props }) {
	const [filterFunction, setFilterFunction] = React.useState<FilterFunction<any>>(() => () => true);

	function makeFilterFunction<KeyType, ValueType>(keyExtractor: KeyExtractor<KeyType, ValueType>) {
		return (a: KeyType) => filterFunction(keyExtractor(a));
	}

	return (
		<FilterContext.Provider {...props} value={{
			makeFilterFunction,
			setFilterFunction,
		}} />
	);
}

export function useFilter() {
	return React.useContext(FilterContext) as FilterContext;
}