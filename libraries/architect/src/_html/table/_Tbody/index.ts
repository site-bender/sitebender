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
 + HTML tbody element wrapper for table body
 */
export default function _Tbody(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("tbody")(role)
	const attributes = {
		..._validateAttributes("tbody")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "TBODY",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
