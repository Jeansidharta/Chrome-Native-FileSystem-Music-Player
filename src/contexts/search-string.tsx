import React from 'react';

type SearchFunction<DataType> = (a: DataType) => boolean;
type KeyExtractor<DataType, KeyType> = (a: DataType) => KeyType;
type MakeSearchFunction = <DataType>(keyExtractor: KeyExtractor<DataType, string>) => SearchFunction<DataType>;

type SearchStringContext = {
	setSearchString: (searchString: string) => void,
	searchString: string,
	makeSearchFunction: MakeSearchFunction,
}

const SearchStringContext = React.createContext<SearchStringContext | null>(null);

export function SearchStringProvider ({ ...props }) {
	const [searchString, setSearchString] = React.useState<string>('');

	function makeSearchFunction<KeyType>(keyExtractor: KeyExtractor<KeyType, string>) {
		return (a: KeyType) => keyExtractor(a).trim().toLowerCase().includes(searchString);
	}

	function sanitizeAndSetSearchString (newString: string) {
		setSearchString(newString.trim().toLowerCase());
	}

	return (
		<SearchStringContext.Provider {...props} value={{
			searchString,
			makeSearchFunction,
			setSearchString: sanitizeAndSetSearchString,
		}} />
	);
}

export function useSearchString() {
	return React.useContext(SearchStringContext) as SearchStringContext;
}