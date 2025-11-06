import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		title?: string // Definition term
	}>

/*++
 + HTML dfn element wrapper for defining instance of term
 */
export default function _Dfn(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("dfn")(role)
	// Validate ARIA attributes only if provided
	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("dfn")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("dfn")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "DFN",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
