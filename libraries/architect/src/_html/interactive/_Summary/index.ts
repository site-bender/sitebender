import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML summary element wrapper for details disclosure control
 */
export default function _Summary(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("summary")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("summary")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("summary")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "SUMMARY",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
