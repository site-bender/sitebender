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
 + HTML rp element wrapper for ruby fallback parentheses
 */
export default function _Rp(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("rp")(role)
	const attributes = {
		..._validateAttributes("rp")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "RP",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
