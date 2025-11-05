import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		for?: string // Space-separated list of IDs
		form?: string // ID of associated form
		name?: string // Name for output
	}>

/*++
 + HTML output element wrapper for calculation results
 */
export default function _Output(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("output")(role)
	const attributes = {
		..._validateAttributes("output")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "OUTPUT",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
