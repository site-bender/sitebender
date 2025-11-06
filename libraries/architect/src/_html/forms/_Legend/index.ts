import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML legend element wrapper for fieldset caption
 */
export default function _Legend(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("legend")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("legend")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("legend")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "LEGEND",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
