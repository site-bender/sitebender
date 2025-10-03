//++ A simple valid TypeScript file for testing
export default function add(augend: number) {
	return function addToAugend(addend: number): number {
		return augend + addend
	}
}
