import isNotNullish from "@sitebender/toolsmith/predicates/isNotNullish/index.ts"

/*++
 + Converts a single attribute entry to a string attribute
 + Filters out null and undefined values
 + Used as reducer function for converting props to string attributes
 */
export default function _convertAttributeEntry(
	accumulator: Readonly<Record<string, string>>,
) {
	return function convertAttributeEntryWithAccumulator(
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
}
