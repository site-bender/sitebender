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
 + HTML dd element wrapper for description list definition
 */
export default function _Dd(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("dd")(role)
	const attributes = {
		..._validateAttributes("dd")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "DD",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
