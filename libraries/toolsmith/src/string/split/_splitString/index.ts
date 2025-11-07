//++ Splits a string into array using separator (private plain string path)
//++ [EXCEPTION] Using native .split() method for string splitting
export default function _splitString(separator: string | RegExp) {
	return function _splitStringWithSeparator(
		input: string,
	): ReadonlyArray<string> {
		//++ [EXCEPTION] Using native .split() method to split string
		return input.split(separator) as ReadonlyArray<string>
	}
}
