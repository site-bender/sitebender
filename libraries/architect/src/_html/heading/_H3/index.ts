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
 + HTML h3 element wrapper for subsection headings
 */
export default function _H3(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("h3")(role)
	const attributes = {
		..._validateAttributes("h3")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "H3",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
