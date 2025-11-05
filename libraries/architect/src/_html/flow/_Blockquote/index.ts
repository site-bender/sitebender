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
 + HTML blockquote element wrapper for block quotations
 */
export default function _Blockquote(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("blockquote")(role)
	const attributes = {
		..._validateAttributes("blockquote")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "BLOCKQUOTE",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
