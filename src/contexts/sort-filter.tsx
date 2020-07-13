import React from 'react';
import { MusicEntry } from '../models';

type SortFunction = (a: MusicEntry, b: MusicEntry) => number;
type FilterFunction = (a: MusicEntry) => boolean;

type SortFilterContext = {
	sortFunction: SortFunction,
	setSortFunction: (sort: SortFunction) => void,
	filterFunction: FilterFunction,
	setFilterFunction: (filter: FilterFunction) => void,
	setSearchString: (searchString: string) => void,
	searchString: string,
}

const SortFilterContext = React.createContext<SortFilterContext | null>(null);

export function SortFilterProvider ({ ...props }) {
	const [sortFunction, setSortFunction] = React.useState<SortFunction>(() => 0);
	const [filterFunction, setFilterFunction] = React.useState<FilterFunction>(() => true);
	const [searchString, setSearchString] = React.useState<string>('');

	const filterFunctionWithSearchString: FilterFunction = (a: MusicEntry) => {
		if (!a.handler.name.includes(searchString)) return false;
		return filterFunction(a);
	}

	return (
		<SortFilterContext.Provider {...props} value={{
			sortFunction,
			setSortFunction,
			filterFunction: filterFunctionWithSearchString,
			setFilterFunction,
			searchString,
			setSearchString,
		}} />
	);
}

export function useSortFilter () {
	return React.useContext(SortFilterContext);
}