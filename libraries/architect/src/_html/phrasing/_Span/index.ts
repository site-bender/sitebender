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
 + HTML span element wrapper for inline phrasing content
 */
export default function _Span(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("span")(role)
	const attributes = {
		..._validateAttributes("span")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "SPAN",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
