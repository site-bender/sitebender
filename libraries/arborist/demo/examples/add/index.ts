//++ Adds two numbers together
//++ First parameter is the augend (base value)
//++ Returns a function that takes the addend and returns the sum
export default function add(augend: number) {
	return function addToAugend(addend: number): number {
		return augend + addend
	}
}
