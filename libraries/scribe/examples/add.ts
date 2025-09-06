// Adds two numbers together
export default function add(x: number) {
	return function(y: number): number {
		return x + y
	}
}