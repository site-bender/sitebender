export default function charCodeAt(index: number) {
	return function charCodeAtIndex(value: string): number {
		return value.charCodeAt(index)
	}
}
