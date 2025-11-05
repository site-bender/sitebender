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
 + HTML rt element wrapper for ruby text
 */
export default function _Rt(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("rt")(role)
	const attributes = {
		..._validateAttributes("rt")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "RT",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
