import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML svg element wrapper for SVG vector graphics
 */
export default function _Svg(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("svg")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("svg")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("svg")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "SVG",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
		namespace: "http://www.w3.org/2000/svg",
	}
}
