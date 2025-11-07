export default function charCodeAt(index: number) {
	return function charCodeAtIndex(value: string): number {
		//++ [EXCEPTION] .charCodeAt() permitted in Toolsmith for performance - provides curried charCodeAt wrapper
		return value.charCodeAt(index)
	}
}
