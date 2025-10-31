import entries from "@sitebender/toolsmith/object/entries/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"

/*++
 + Removes data-data-* duplicates from attributes
 + Converts data-data-custom to data-custom
 + Private helper for _validateAttributes
 */
export default function _cleanDataDuplicates(
	attrs: Readonly<Record<string, string>>,
): Readonly<Record<string, string>> {
	function cleanAttribute(
		accumulator: Readonly<Record<string, string>>,
		entry: readonly [string, string],
	): Readonly<Record<string, string>> {
		const [key, value] = entry

		if (key.startsWith("data-data-")) {
			const cleanedKey = key.replace(/^data-data-/, "data-")

			return {
				...accumulator,
				[cleanedKey]: value,
			}
		}

		return {
			...accumulator,
			[key]: value,
		}
	}

	const attrsEntriesResult = entries(attrs)
	const attrsEntries = getOrElse(
		[] as ReadonlyArray<readonly [string, string]>,
	)(attrsEntriesResult)
	const cleanedAttrs = reduce(cleanAttribute)({})(attrsEntries)

	return cleanedAttrs
}
