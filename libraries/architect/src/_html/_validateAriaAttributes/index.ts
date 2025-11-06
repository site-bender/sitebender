import entries from "@sitebender/toolsmith/object/entries/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"

import _getAllowedAriaAttributes from "./_getAllowedAriaAttributes/index.ts"
import _getEffectiveRole from "./_getEffectiveRole/index.ts"
import _validateAriaValue from "./_validateAriaValue/index.ts"

/*++
 + Validates ARIA attributes using whitelist approach
 +
 + Signature (curried):
 + _validateAriaAttributes(tagName)(role)(aria)
 +
 + Logic:
 + 1. Determine effective role (explicit or implicit)
 + 2. Get list of allowed ARIA attributes for element+role
 + 3. Process aria object:
 +    - Valid attributes → validate value and add to result
 +    - Invalid attributes → convert to data-§-bad-aria-* with error
 + 4. Return flat object with all attributes
 +
 + Example:
 + Input:  tagName="div", role="button", aria={ label: "Click", invalid: "bad" }
 + Output: {
 +   "aria-label": "Click",
 +   "data-§-bad-aria-invalid": "bad",
 +   "data-§-aria-error": "aria-invalid not allowed on div with role button"
 + }
 */

export default function _validateAriaAttributes(tagName: string) {
	return function _validateAriaAttributesForTagName(role: unknown) {
		return function _validateAriaAttributesForRole(
			aria: Readonly<Record<string, unknown>>,
		): Readonly<Record<string, string>> {
			/*++
			 + Step 1: Determine effective role
			 */
			const getEffectiveRole = _getEffectiveRole(tagName)
			const effectiveRole = getEffectiveRole(role)

			/*++
			 + Step 2: Get allowed ARIA attributes for this element+role
			 */
			const getAllowedAttributes = _getAllowedAriaAttributes(tagName)
			const allowedAttributes = getAllowedAttributes(effectiveRole)

			/*++
			 + Step 3: Process each aria attribute
			 */
			const ariaEntriesResult = entries(aria)
			const ariaEntries = getOrElse(
				[] as ReadonlyArray<readonly [string, unknown]>,
			)(ariaEntriesResult)

			/*++
			 + Process all entries and accumulate results into flat object
			 + Curried reducer function for functional compliance
			 */
			function processAriaEntry(
				accumulator: Readonly<Record<string, string>>,
			) {
				return function processAriaEntryWithAccumulator(
					entry: readonly [string, unknown],
				): Readonly<Record<string, string>> {
					const [key, value] = entry
					const ariaKey = `aria-${key}`

					/*++
				 + Check if this attribute is allowed
				 */
					const isAllowed = includes(allowedAttributes)(ariaKey)

					if (not(isAllowed)) {
						/*++
					 + Invalid attribute → add error attribute to result
					 */
						const errorKey = `data-§-bad-aria-${key}`
						const errorMessage = effectiveRole
							? `aria-${key} not allowed on ${tagName} with role ${effectiveRole}`
							: `aria-${key} not allowed on ${tagName} (no role)`

						return {
							...accumulator,
							[errorKey]: String(value),
							"data-§-aria-error": errorMessage,
						}
					}

					/*++
				 + Attribute is allowed → validate its value
				 */
					const validateValue = _validateAriaValue(ariaKey)
					const validationError = validateValue(value)

					if (isDefined(validationError)) {
						/*++
					 + Value is invalid → add error attribute to result
					 */
						const errorKey = `data-§-bad-aria-${key}`

						return {
							...accumulator,
							[errorKey]: String(value),
							"data-§-aria-error": validationError,
						}
					}

					/*++
				 + Attribute and value are valid → add to result
				 */
					return {
						...accumulator,
						[ariaKey]: String(value),
					}
				}
			}

			const initialResult: Readonly<Record<string, string>> = {}

			const result = reduce(processAriaEntry)(initialResult)(ariaEntries)

			return result
		}
	}
}
