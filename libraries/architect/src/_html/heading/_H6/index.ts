import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML h6 element wrapper for sixth-level headings
 */
export default function _H6(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("h6")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("h6")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("h6")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "H6",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
