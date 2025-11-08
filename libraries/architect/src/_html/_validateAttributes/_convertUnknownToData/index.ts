import entries from "@sitebender/toolsmith/object/entries/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import toKebab from "@sitebender/toolsmith/string/toCase/toKebab/index.ts"

/*++
 + Converts unknown attributes to data-* attributes
 + Converts camelCase to kebab-case: onClick -> data-on-click
 + Private helper for _validateAttributes
 */
export default function _convertUnknownToData(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	function buildDataAttribute(
		accumulator: Readonly<Record<string, string>>,
		entry: readonly [string, unknown],
	): Readonly<Record<string, string>> {
		const [key, value] = entry
		const kebabKey = toKebab(key)
		const dataKey = `data-${kebabKey}`

		return {
			...accumulator,
			[dataKey]: String(value),
		}
	}

	const propsEntriesResult = entries(props)
	const propsEntries = getOrElse(
		[] as ReadonlyArray<readonly [string, unknown]>,
	)(propsEntriesResult)
	const dataAttrs = reduce(buildDataAttribute)({})(propsEntries)

	return dataAttrs
}
