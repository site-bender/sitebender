import _processItems from "./_processItems/index.ts"

//++ Calculates total from an array of items
export default function calculateTotal(items: ReadonlyArray<number>): number {
	const processed = _processItems(items)

	return processed.reduce(function (sum, item) {
		return sum + item
	}, 0)
}
