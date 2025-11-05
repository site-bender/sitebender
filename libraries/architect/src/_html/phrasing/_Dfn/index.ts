import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		title?: string // Definition term
	}>

/*++
 + HTML dfn element wrapper for defining instance of term
 */
export default function _Dfn(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("dfn")(role)
	const attributes = {
		..._validateAttributes("dfn")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "DFN",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
