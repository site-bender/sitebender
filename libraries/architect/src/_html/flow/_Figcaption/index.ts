import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML figcaption element wrapper for figure caption
 */
export default function _Figcaption(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("figcaption")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("figcaption")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("figcaption")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "FIGCAPTION",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
