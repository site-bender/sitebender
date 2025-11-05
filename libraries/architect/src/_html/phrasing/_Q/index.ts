import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		cite?: string // URL of quoted source
	}>

/*++
 + HTML q element wrapper for inline quotations
 */
export default function _Q(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("q")(role)
	const attributes = {
		..._validateAttributes("q")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "Q",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
