import isNotNullish from "@sitebender/toolsmith/predicates/isNotNullish/index.ts"

/*++
 + Converts a single attribute entry to a string attribute
 + Filters out null and undefined values
 + Used as reducer function for converting props to string attributes
 + [EXCEPTION] Uncurried function (two parameters) because it's passed to reduce
 + Toolsmith's reduce is a thin wrapper around Array.reduce which expects uncurried callbacks
 */
export default function _convertAttributeEntry(
	accumulator: Readonly<Record<string, string>>,
	entry: readonly [string, unknown],
): Readonly<Record<string, string>> {
	const [key, value] = entry

	if (isNotNullish(value)) {
		return {
			...accumulator,
			[key]: String(value),
		}
	}

	return accumulator
}
