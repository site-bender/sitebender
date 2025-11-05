import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// No element-specific props
	}>

/*++
 + HTML mark element wrapper for marked/highlighted text
 */
export default function _Mark(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("mark")(role)
	const attributes = {
		..._validateAttributes("mark")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "MARK",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
