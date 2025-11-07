import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML hgroup element wrapper for heading group
 */
export default function _Hgroup(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("hgroup")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("hgroup")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("hgroup")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "HGROUP",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
