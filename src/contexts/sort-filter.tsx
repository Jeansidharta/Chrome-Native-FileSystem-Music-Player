import React from 'react';

type SortFunction<DataType> = (a: DataType, b: DataType) => number;
type FilterFunction<DataType> = (a: DataType) => boolean;

type KeyExtractor<DataType, KeyType> = (a: DataType) => KeyType;

type MakeSortFunction = <DataType, KeyType>(keyExtractor: KeyExtractor<DataType, KeyType>) => SortFunction<DataType>;
type MakeFilterFunction = <DataType, KeyType>(keyExtractor: KeyExtractor<DataType, KeyType>) => FilterFunction<DataType>;
type MakeSearchFunction = <DataType>(keyExtractor: KeyExtractor<DataType, string>) => FilterFunction<DataType>;

type SortFilterContext = {
	makeSortFunction: MakeSortFunction;
	setSortFunction: <DataType>(sort: SortFunction<DataType>) => void,
	makeFilterFunction: MakeFilterFunction,
	setFilterFunction: <DataType>(filter: FilterFunction<DataType>) => void,
	setSearchString: (searchString: string) => void,
	searchString: string,
	makeSearchFunction: MakeSearchFunction,
}

type SortFilterContextWithKeyExtractor<DataType> = Omit<
	SortFilterContext,
	'makeSortFunction' | 'makeFilterFunction'
> & {
	sortFunction: SortFunction<DataType>;
	filterFunction: FilterFunction<DataType>,
};

type SortFilterContextWithStringKeyExtractor<DataType> = Omit<
	SortFilterContextWithKeyExtractor<DataType>,
	'makeSearchFunction'
> & {
	searchFunction: FilterFunction<DataType>,
}

const SortFilterContext = React.createContext<SortFilterContext | null>(null);

export function SortFilterProvider ({ ...props }) {
	const [sortFunction, setSortFunction] = React.useState<SortFunction<any>>(() => () => 0);
	const [filterFunction, setFilterFunction] = React.useState<FilterFunction<any>>(() => () => true);
	const [searchString, setSearchString] = React.useState<string>('');

	function makeSortFunction<KeyType, ValueType>(keyExtractor: KeyExtractor<KeyType, ValueType>) {
		return (a: KeyType, b: KeyType) => sortFunction(keyExtractor(a), keyExtractor(b));
	}

	function makeFilterFunction<KeyType, ValueType>(keyExtractor: KeyExtractor<KeyType, ValueType>) {
		return (a: KeyType) => filterFunction(keyExtractor(a));
	}

	function makeSearchFunction<KeyType>(keyExtractor: KeyExtractor<KeyType, string>) {
		return (a: KeyType) => keyExtractor(a).trim().toLowerCase().includes(searchString);
	}

	function sanitizeAndSetSearchString (newString: string) {
		setSearchString(newString.trim().toLowerCase());
	}

	return (
		<SortFilterContext.Provider {...props} value={{
			makeSortFunction,
			setSortFunction,
			makeFilterFunction,
			setFilterFunction,
			searchString,
			makeSearchFunction,
			setSearchString: sanitizeAndSetSearchString,
		}} />
	);
}

/** If no KeyExtractor is provided, return the maker functions to allow for the
User to make them it themselves. */
export function useSortFilter<DataType, KeyType>(): SortFilterContext;
/** If a KeyExtractor is provided, but it does not return a string, preemptively
create the `sortFunction` and `filterFunction`, but since the KeyExtractor does not
return a string, this function cannot be used to create the `searchFunction` with it. */
export function useSortFilter<DataType>(keyExtractor: KeyExtractor<DataType, string>): SortFilterContextWithStringKeyExtractor<DataType>
/** If a KeyExtractor is provided, and it does return a string, preemptively create the
`sortFunction`, `filterFunction` and `searchFunction` with it */
export function useSortFilter<DataType, KeyType>(keyExtractor: KeyExtractor<DataType, KeyType>): SortFilterContextWithKeyExtractor<DataType>;
export function useSortFilter<DataType, KeyType>(keyExtractor?: KeyExtractor<DataType, KeyType>) {
	if (!keyExtractor) {
		return React.useContext(SortFilterContext) as SortFilterContext;
	} else {
		const data = React.useContext(SortFilterContext) as SortFilterContext;

		const sortFunction = data.makeSortFunction(keyExtractor);
		const filterFunction = data.makeFilterFunction(keyExtractor);
		const searchFunction = data.makeSearchFunction(keyExtractor as any);

		const newData: SortFilterContextWithStringKeyExtractor<DataType> = {
			...data,
			sortFunction,
			filterFunction,
			searchFunction,
		};
		return newData as (
			KeyType extends string
			? SortFilterContextWithStringKeyExtractor<DataType>
			: SortFilterContextWithKeyExtractor<DataType>
		);
	}
}