import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML div element wrapper for flow content
 */
export default function _Div(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("div")(role)

	/*++
	 + Validate ARIA attributes only if provided
	 */
	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("div")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("div")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "DIV",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
