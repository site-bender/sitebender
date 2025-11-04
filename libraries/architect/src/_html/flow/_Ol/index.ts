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
 + HTML ol element wrapper for ordered lists
 */
export default function _Ol(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("ol")(role)
	const attributes = {
		..._validateAttributes("ol")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "OL",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
