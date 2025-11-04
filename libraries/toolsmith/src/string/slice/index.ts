//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
//++ Extracts substring from start to end index (wrapper for native String.prototype.slice)
export default function slice(start: number) {
	return function sliceFrom(end: number) {
		return function sliceFromTo(str: string | null | undefined): string {
			//++ [EXCEPTION] typeof operator and string methods allowed
			if (str === null || str === undefined || typeof str !== "string") {
				return ""
			}

			//++ [EXCEPTION] Native slice method for performance
			return str.slice(start, end)
		}
	}
}
