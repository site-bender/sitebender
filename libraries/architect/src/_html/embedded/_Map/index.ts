import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		name?: string // Name for the image map (referenced by <img usemap>)
	}>

/*++
 + HTML map element wrapper for image maps
 */
export default function _Map(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("map")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("map")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("map")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "MAP",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
