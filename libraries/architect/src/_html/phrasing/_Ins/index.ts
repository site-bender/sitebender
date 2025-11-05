import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		cite?: string // URL explaining insertion
		datetime?: string // Date/time of insertion
	}>

/*++
 + HTML ins element wrapper for inserted content
 */
export default function _Ins(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("ins")(role)
	const attributes = {
		..._validateAttributes("ins")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "INS",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
