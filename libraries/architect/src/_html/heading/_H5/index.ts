import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML h5 element wrapper for fifth-level headings
 */
export default function _H5(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("h5")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("h5")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("h5")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "H5",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
