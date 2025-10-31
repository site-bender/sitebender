import entries from "@sitebender/toolsmith/object/entries/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import { ELEMENT_SPECIFIC_ATTRIBUTES } from "../constants/index.ts"

type ValidationResult = Readonly<{
	elementAttrs: Readonly<Record<string, string>>
	dataAttrs: Readonly<Record<string, unknown>>
}>

/*++
 + Validates element-specific attributes by tagName
 + Returns elementAttrs (validated) and dataAttrs (unknown attributes)
 + First pass - simple string validation for known attributes
 */
export default function _validateAttributesByTagName(tagName: string) {
	return function _validateAttributesByTagNameForElement(
		props: Readonly<Record<string, unknown>>,
	): ValidationResult {
		const allowedAttributes = ELEMENT_SPECIFIC_ATTRIBUTES[tagName] || []

		function isElementAttribute(
			entry: readonly [string, unknown],
		): boolean {
			const [key] = entry

			return includes(allowedAttributes)(key)
		}

		function isNotElementAttribute(
			entry: readonly [string, unknown],
		): boolean {
			const [key] = entry

			return not(includes(allowedAttributes)(key))
		}

		function buildElementAttribute(
			accumulator: Readonly<Record<string, string>>,
			entry: readonly [string, unknown],
		): Readonly<Record<string, string>> {
			const [key, value] = entry

			if (isString(value)) {
				return {
					...accumulator,
					[key]: value,
				}
			}

			return {
				...accumulator,
				[`data-§-bad-${key}`]: String(value),
			}
		}

		function buildDataAttribute(
			accumulator: Readonly<Record<string, unknown>>,
			entry: readonly [string, unknown],
		): Readonly<Record<string, unknown>> {
			const [key, value] = entry

			return {
				...accumulator,
				[key]: value,
			}
		}

		const propsEntriesResult = entries(props)
		const propsEntries = getOrElse(
			[] as ReadonlyArray<readonly [string, unknown]>,
		)(propsEntriesResult)

		const elementEntriesResult = filter(isElementAttribute)(propsEntries)
		const elementEntries = getOrElse(
			[] as ReadonlyArray<readonly [string, unknown]>,
		)(elementEntriesResult)

		const dataEntriesResult = filter(isNotElementAttribute)(propsEntries)
		const dataEntries = getOrElse(
			[] as ReadonlyArray<readonly [string, unknown]>,
		)(dataEntriesResult)

		const elementAttrs = reduce(buildElementAttribute)({})(elementEntries)
		const dataAttrs = reduce(buildDataAttribute)({})(dataEntries)

		return {
			elementAttrs,
			dataAttrs,
		}
	}
}
