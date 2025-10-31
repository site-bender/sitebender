import entries from "@sitebender/toolsmith/object/entries/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"

/*++
 + Validates ARIA attributes from aria object
 + Converts { label: "Main", hidden: "true" } to { "aria-label": "Main", "aria-hidden": "true" }
 + Returns validated aria-* attributes
 */
export default function _validateAriaAttributes(
	aria: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	function buildAriaAttribute(
		accumulator: Readonly<Record<string, string>>,
		entry: readonly [string, unknown],
	): Readonly<Record<string, string>> {
		const [key, value] = entry
		const ariaKey = `aria-${key}`

		return {
			...accumulator,
			[ariaKey]: String(value),
		}
	}

	const ariaEntriesResult = entries(aria)
	const ariaEntries = getOrElse(
		[] as ReadonlyArray<readonly [string, unknown]>,
	)(ariaEntriesResult)
	const ariaAttrs = reduce(buildAriaAttribute)({})(ariaEntries)

	return ariaAttrs
}
