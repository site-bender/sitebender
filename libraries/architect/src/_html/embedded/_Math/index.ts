import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML math element wrapper for MathML mathematical expressions
 */
export default function _Math(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("math")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("math")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("math")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "MATH",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
		namespace: "http://www.w3.org/1998/Math/MathML",
	}
}
