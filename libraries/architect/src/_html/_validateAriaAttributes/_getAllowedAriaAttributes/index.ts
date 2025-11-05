import concat from "@sitebender/toolsmith/array/concat/index.ts"
import entries from "@sitebender/toolsmith/object/entries/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import unique from "@sitebender/toolsmith/array/unique/index.ts"

import {
	ARIA_ATTRIBUTES,
	ARIA_ROLES,
	HTML_ELEMENTS,
} from "../../constants/ariaStandards.ts"

/*++
 + Gets the list of allowed ARIA attributes for an element
 +
 + Logic:
 + 1. If element has noAriaAttrs: true → return empty array
 + 2. If element has namingProhibited: true and no role → exclude naming attributes
 + 3. Get role-specific allowed attributes
 + 4. Add global ARIA attributes (if element has a role)
 + 5. Return deduplicated list
 +
 + Naming attributes: aria-label, aria-labelledby
 */
export default function _getAllowedAriaAttributes(tagName: string) {
	return function _getAllowedAriaAttributesForTagName(
		effectiveRole: string | undefined,
	): ReadonlyArray<string> {
		const elementRules = HTML_ELEMENTS[tagName.toLowerCase()]

		/*++
		 + Unknown element → no validation data available
		 + Allow all ARIA (will be added in full expansion)
		 */
		if (!elementRules) {
			return []
		}

		/*++
		 + Some elements (metadata) cannot have ANY ARIA attributes
		 */
		if (elementRules.noAriaAttrs === true) {
			return []
		}

		/*++
		 + Elements with no role cannot have ARIA attributes
		 + (Except naming-prohibited elements with explicit role)
		 */
		if (!isDefined(effectiveRole)) {
			return []
		}

		/*++
		 + Get all global ARIA attributes (allowed on any element with role)
		 */
		function isGlobalAttribute(
			entry: readonly [string, unknown],
		): boolean {
			const [, value] = entry
			return (
				typeof value === "object" &&
				value !== null &&
				"global" in value &&
				value.global === true
			)
		}

		function extractAttributeName(
			entry: readonly [string, unknown],
		): string {
			const [key] = entry
			return key
		}

		const ariaAttrsEntriesResult = entries(ARIA_ATTRIBUTES)
		const ariaAttrsEntries = getOrElse(
			[] as ReadonlyArray<readonly [string, unknown]>,
		)(ariaAttrsEntriesResult)

		const globalAttrsFilterResult = filter(isGlobalAttribute)(ariaAttrsEntries)
		const globalAttrsEntries = getOrElse(
			[] as ReadonlyArray<readonly [string, unknown]>,
		)(globalAttrsFilterResult)

		const globalAttrs = map(extractAttributeName)(globalAttrsEntries)

		/*++
		 + Handle naming-prohibited elements
		 + These cannot have aria-label or aria-labelledby UNLESS they have an explicit role
		 + If effectiveRole matches implicitRole, then it's implicit (naming prohibited)
		 + If effectiveRole differs from implicitRole, then it's explicit (naming allowed)
		 */
		const hasExplicitRole = effectiveRole !== elementRules.implicitRole
		const shouldFilterNaming =
			elementRules.namingProhibited === true && !hasExplicitRole

		const namingAttrs = ["aria-label", "aria-labelledby"]

		function isNotNamingAttribute(attr: string): boolean {
			return !namingAttrs.includes(attr)
		}

		const globalAttrsFilteredResult = shouldFilterNaming
			? filter(isNotNamingAttribute)(globalAttrs)
			: globalAttrs

		const globalAttrsArray = shouldFilterNaming
			? getOrElse([] as ReadonlyArray<string>)(globalAttrsFilteredResult)
			: globalAttrs

		/*++
		 + Get role-specific allowed attributes
		 */
		const roleDefinition = ARIA_ROLES[effectiveRole]

		if (!roleDefinition) {
			/*++
			 + Unknown role → only allow global attributes
			 + (Will be added in full expansion)
			 */
			return globalAttrsArray
		}

		/*++
		 + Merge role-specific and global attributes
		 */
		const roleAttrs = roleDefinition.allowedAttrs || []
		const requiredAttrs = roleDefinition.requiredAttrs || []

		/*++
		 + Combine all allowed attributes using Toolsmith functions
		 + concat globalAttrs + roleAttrs + requiredAttrs, then deduplicate
		 */
		const globalPlusRole = concat(globalAttrsArray)(roleAttrs)
		const allAttrsDuplicates = concat(globalPlusRole)(requiredAttrs)
		const allAttrs = unique(allAttrsDuplicates)

		return allAttrs
	}
}
