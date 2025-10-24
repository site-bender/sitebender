import reduce from "@sitebender/toolsmith/array/reduce/index.ts"

import _processItems from "./_processItems/index.ts"
import _sumItems from "./_sumItems/index.ts"

//++ Calculates total from an array of items
export default function calculateTotal(items: ReadonlyArray<number>): number {
	const processed = _processItems(items)

	return reduce(_sumItems)(0)(processed)
}
