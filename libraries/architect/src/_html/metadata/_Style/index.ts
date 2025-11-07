import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
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
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("style")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("style")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("style")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "STYLE",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
