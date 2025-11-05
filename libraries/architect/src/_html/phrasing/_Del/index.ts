import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		cite?: string // URL explaining deletion
		datetime?: string // Date/time of deletion
	}>

/*++
 + HTML del element wrapper for deleted content
 */
export default function _Del(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("del")(role)
	const attributes = {
		..._validateAttributes("del")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "DEL",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
