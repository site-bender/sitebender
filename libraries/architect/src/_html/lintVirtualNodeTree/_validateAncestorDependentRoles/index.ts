import concat from "@sitebender/toolsmith/array/concat/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import type { AncestorContext, ValidationError } from "../types/index.ts"
import _checkDivInDlRule from "./_checkDivInDlRule/index.ts"
import _checkFooterRule from "./_checkFooterRule/index.ts"
import _checkHeaderRule from "./_checkHeaderRule/index.ts"
import _checkLiInListRule from "./_checkLiInListRule/index.ts"
import _checkSummaryInDetailsRule from "./_checkSummaryInDetailsRule/index.ts"

/*++
 + Validates ancestor-dependent role rules
 +
 + From Phase 8 requirements:
 + 1. div child of dl - Only none/presentation roles allowed
 + 2. footer - Different roles based on sectioning ancestors
 + 3. header - Different roles based on sectioning ancestors
 + 4. li - Must have listitem role if child of list with list role
 + 5. summary - If child of details, no role allowed
 +
 + Note: td, th, tr validations deferred (require grid/table role checking)
 +
 + Returns array of validation errors
 */
export default function _validateAncestorDependentRoles(
	node: VirtualNode,
): (ancestors: AncestorContext) => ReadonlyArray<ValidationError> {
	return function validateAncestorDependentRolesForNode(
		ancestors: AncestorContext,
	): ReadonlyArray<ValidationError> {
		/*++
		 + Only validate element nodes
		 */
		if (node._tag !== "element") {
			return []
		}

		/*++
		 + Check all 5 rules using curried helpers
		 */
		const checkDiv = _checkDivInDlRule(node)
		const checkFooter = _checkFooterRule(node)
		const checkHeader = _checkHeaderRule(node)
		const checkLi = _checkLiInListRule(node)
		const checkSummary = _checkSummaryInDetailsRule(node)

		const divErrors = checkDiv(ancestors)
		const footerErrors = checkFooter(ancestors)
		const headerErrors = checkHeader(ancestors)
		const liErrors = checkLi(ancestors)
		const summaryErrors = checkSummary(ancestors)

		/*++
		 + Combine all error arrays immutably using concat
		 */
		const withFooter = concat(divErrors)(footerErrors)
		const withHeader = concat(withFooter)(headerErrors)
		const withLi = concat(withHeader)(liErrors)
		const allErrors = concat(withLi)(summaryErrors)

		return allErrors
	}
}
