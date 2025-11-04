//++ [EXCEPTION] Predicate returns boolean directly (documented exception)
//++ [EXCEPTION] JS methods permitted in Toolsmith for performance
//++ Checks if string starts with search string (wrapper for native String.prototype.startsWith)
export default function startsWith(searchString: string) {
	return function startsWithSearchString(str: string): boolean {
		//++ [EXCEPTION] Native startsWith method for performance
		return str.startsWith(searchString)
	}
}
