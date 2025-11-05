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
 + HTML samp element wrapper for sample output
 */
export default function _Samp(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("samp")(role)
	const attributes = {
		..._validateAttributes("samp")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "SAMP",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
