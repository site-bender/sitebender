import _doubleValue from "./_doubleValue/index.ts"

//++ Private helper that processes items by doubling them
export default function _processItems(
	items: ReadonlyArray<number>,
): ReadonlyArray<number> {
	return items.map(_doubleValue)
}
