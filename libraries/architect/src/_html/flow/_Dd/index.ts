import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML dd element wrapper for description list definition
 */
export default function _Dd(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("dd")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("dd")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("dd")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "DD",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
