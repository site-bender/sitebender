import entries from "@sitebender/toolsmith/object/entries/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"

import _getAllowedAriaAttributes from "./_getAllowedAriaAttributes/index.ts"
import _getEffectiveRole from "./_getEffectiveRole/index.ts"
import _validateAriaValue from "./_validateAriaValue/index.ts"

/*++
 + Validates ARIA attributes using whitelist approach
 +
 + New signature (curried):
 + _validateAriaAttributes(tagName)(role)(aria)
 +
 + Logic:
 + 1. Determine effective role (explicit or implicit)
 + 2. Get list of allowed ARIA attributes for element+role
 + 3. Process aria object:
 +    - Valid attributes → validate value and add to result
 +    - Invalid attributes → convert to data-§-bad-aria-* with error
 + 4. Return { validAttrs, invalidAttrs, errors }
 +
 + Example:
 + Input:  tagName="div", role="button", aria={ label: "Click", invalid: "bad" }
 + Output: {
 +   validAttrs: { "aria-label": "Click" },
 +   invalidAttrs: { "data-§-bad-aria-invalid": "bad" },
 +   errors: { "data-§-aria-error": "aria-invalid not allowed on div with role button" }
 + }
 */

export type ValidatedAriaResult = Readonly<{
	validAttrs: Readonly<Record<string, string>>
	invalidAttrs: Readonly<Record<string, string>>
	errors: Readonly<Record<string, string>>
}>

export default function _validateAriaAttributes(tagName: string) {
	return function _validateAriaAttributesForTagName(role: unknown) {
		return function _validateAriaAttributesForRole(
			aria: Readonly<Record<string, unknown>>,
		): ValidatedAriaResult {
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
			 + Process all entries and accumulate results
			 */
			function processAriaEntry(
				accumulator: ValidatedAriaResult,
				entry: readonly [string, unknown],
			): ValidatedAriaResult {
				const [key, value] = entry
				const ariaKey = `aria-${key}`

				/*++
				 + Check if this attribute is allowed
				 */
				const isAllowed = includes(allowedAttributes)(ariaKey)

				if (!isAllowed) {
					/*++
					 + Invalid attribute → add to invalidAttrs with error
					 */
					const errorKey = `data-§-bad-aria-${key}`
					const errorMessage = effectiveRole
						? `aria-${key} not allowed on ${tagName} with role ${effectiveRole}`
						: `aria-${key} not allowed on ${tagName} (no role)`

					return {
						validAttrs: accumulator.validAttrs,
						invalidAttrs: {
							...accumulator.invalidAttrs,
							[errorKey]: String(value),
						},
						errors: {
							...accumulator.errors,
							"data-§-aria-error": errorMessage,
						},
					}
				}

				/*++
				 + Attribute is allowed → validate its value
				 */
				const validateValue = _validateAriaValue(ariaKey)
				const validationError = validateValue(value)

				if (isDefined(validationError)) {
					/*++
					 + Value is invalid → add to invalidAttrs with error
					 */
					const errorKey = `data-§-bad-aria-${key}`

					return {
						validAttrs: accumulator.validAttrs,
						invalidAttrs: {
							...accumulator.invalidAttrs,
							[errorKey]: String(value),
						},
						errors: {
							...accumulator.errors,
							"data-§-aria-error": validationError,
						},
					}
				}

				/*++
				 + Attribute and value are valid → add to validAttrs
				 */
				return {
					validAttrs: {
						...accumulator.validAttrs,
						[ariaKey]: String(value),
					},
					invalidAttrs: accumulator.invalidAttrs,
					errors: accumulator.errors,
				}
			}

			const initialResult: ValidatedAriaResult = {
				validAttrs: {},
				invalidAttrs: {},
				errors: {},
			}

			const result = reduce(processAriaEntry)(initialResult)(ariaEntries)

			return result
		}
	}
}
