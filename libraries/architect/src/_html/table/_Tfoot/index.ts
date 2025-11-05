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
 + HTML tfoot element wrapper for table footer
 */
export default function _Tfoot(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("tfoot")(role)
	const attributes = {
		..._validateAttributes("tfoot")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "TFOOT",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
