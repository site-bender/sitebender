import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		blocking?: string // Render-blocking behavior
		media?: string // Media query
	}>

/*++
 + HTML style element wrapper for embedded CSS
 */
export default function _Style(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("style")(role)
	const attributes = {
		..._validateAttributes("style")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "STYLE",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
