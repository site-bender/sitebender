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
 + HTML s element wrapper for no longer accurate/relevant content
 */
export default function _S(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("s")(role)
	const attributes = {
		..._validateAttributes("s")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "S",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
