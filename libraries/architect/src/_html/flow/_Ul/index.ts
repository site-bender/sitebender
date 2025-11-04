import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// TODO: Add component-specific props here
	}>

/*++
 + HTML ul element wrapper for unordered lists
 */
export default function _Ul(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("ul")(role)
	const attributes = {
		..._validateAttributes("ul")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "UL",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
