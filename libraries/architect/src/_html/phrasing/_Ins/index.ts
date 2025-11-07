import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		cite?: string // URL explaining insertion
		datetime?: string // Date/time of insertion
	}>

/*++
 + HTML ins element wrapper for inserted content
 */
export default function _Ins(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("ins")(role)
	// Validate ARIA attributes only if provided
	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("ins")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("ins")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "INS",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
