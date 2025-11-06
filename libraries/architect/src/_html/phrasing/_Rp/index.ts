import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"

export type Props = BaseProps

/*++
 + HTML rp element wrapper for ruby fallback parentheses
 */
export default function _Rp(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("rp")(role)
	// Validate ARIA attributes only if provided
	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("rp")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("rp")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "RP",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
