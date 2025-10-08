// @sitebender/arborist/demo/examples/add
//++ Simple curried addition function

//++ Adds two numbers together using currying
//++ This demonstrates proper functional programming style
export default function add(augend: number) {
	return function addToAugend(addend: number): number {
		return augend + addend
	}
}
