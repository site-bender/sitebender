import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML caption element wrapper for table caption
 */
export default function _Caption(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("caption")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("caption")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("caption")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "CAPTION",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
